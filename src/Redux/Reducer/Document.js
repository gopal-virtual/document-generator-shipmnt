import { RECEIVE_DOCUMENT, GO_BACK, GO_NEXT, UPDATE_DOCUMENT, UPDATE_DOCUMENT_META } from '../../Redux/Reducer/Actions'

const Document = (state = {}, action) => {
	switch(action.type){
		case RECEIVE_DOCUMENT:
			return Object.assign({}, state, action.data);
		case GO_NEXT:
			return Object.assign({}, state, {
				meta : Object.assign({}, state.meta, { currentStep : Math.min(state.meta.currentStep + 1, Object.keys(state.data).length) })
			});
		case GO_BACK:
			return Object.assign({}, state, {
				meta : Object.assign({}, state.meta, { currentStep : Math.max(state.meta.currentStep - 1, 1)})
			});
		case UPDATE_DOCUMENT :
			return Object.assign({}, state, {
				data : Object.assign({}, state.data, {
					[action.widgetId] : Object.assign({}, state.data[action.widgetId], {
						value : action.content
					})
				})
			});
		case UPDATE_DOCUMENT_META:
			return Object.assign({}, state, { 
				meta : Object.assign({}, state.meta, {[action.key] : action.value})
			});
		default :
			return Object.assign({}, state);
	}
}

export default Document;