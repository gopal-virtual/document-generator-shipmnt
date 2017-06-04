import { RECEIVE_DOCUMENT, GO_BACK, GO_NEXT } from '../../Redux/Reducer/Actions'

const Document = (state = {}, action) => {
	console.log(action)
	switch(action.type){
		case RECEIVE_DOCUMENT:
			return Object.assign({}, state, action.data, { 
					meta : Object.assign({}, action.data.meta, { id : action.id })
				});
		case GO_NEXT:
			return Object.assign({}, state, {
				meta : Object.assign({}, state.meta, { currentStep : Math.min(state.meta.currentStep + 1, Object.keys(state.data).length) })
			});
		case GO_BACK:
			return Object.assign({}, state, {
				meta : Object.assign({}, state.meta, { currentStep : Math.max(state.meta.currentStep - 1, 1)})
			});
		default :
			return Object.assign({}, state);
	}
}

export default Document;