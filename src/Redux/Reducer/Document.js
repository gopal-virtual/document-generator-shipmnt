import { RECEIVE_DOCUMENT, GO_BACK, GO_NEXT, UPDATE_DOCUMENT, UPDATE_DOCUMENT_META } from '../../Redux/Reducer/Actions'

const Document = (state = {}, action) => {
	switch(action.type){
		case RECEIVE_DOCUMENT:
			return Object.assign({}, action.data, {
				meta : Object.assign({}, action.data.meta, { id : action.id })
			});
		case GO_NEXT:
			return Object.assign({}, state, {
				meta : Object.assign({}, state.meta, { currentStep : Math.min(state.meta.currentStep + 1, Object.keys(state.data).length) })
			});
		case GO_BACK:
			return Object.assign({}, state, {
				meta : Object.assign({}, state.meta, { currentStep : Math.max(state.meta.currentStep - 1, 0)})
			});
		case UPDATE_DOCUMENT :
			if(action.widgetId < 0 || action.widgetId >= state.data.length) return Object.assign({}, state)
			return Object.assign({}, state, {
				data : [
					...state.data.slice(0,action.widgetId),
					Object.assign({}, state.data[action.widgetId], { value : action.content }),
					...state.data.slice(action.widgetId + 1, state.data.length)
				]
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
