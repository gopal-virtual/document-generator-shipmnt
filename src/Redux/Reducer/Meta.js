import { RECEIVE_DOCUMENT_LIST } from '../../Redux/Reducer/Actions'

const Meta = (state = {}, action) => {
	switch(action.type){
		case RECEIVE_DOCUMENT_LIST:
			return Object.assign({}, state, {
				"recentDocuments" : action.data.recentDocuments,
				"templateList" : action.data.templateList
			});
		default :
			return Object.assign({}, state);
	}
}

export default Meta;