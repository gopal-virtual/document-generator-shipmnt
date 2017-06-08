import { DOCUMENT_PATCHING, DOCUMENT_PATCHED, REQUEST_DOCUMENT, RECEIVE_DOCUMENT, RECEIVE_DOCUMENT_LIST } from '../../Redux/Reducer/Actions'

const Ui = (state = { patching : false, requesting : false }, action) => {
	switch(action.type){
		case REQUEST_DOCUMENT :
			return Object.assign({}, state, { requesting : true })
		case RECEIVE_DOCUMENT :
			return Object.assign({}, state, { requesting : false })
		case RECEIVE_DOCUMENT_LIST :
			return Object.assign({}, state, { requesting : false })
		case DOCUMENT_PATCHING:
			return Object.assign({}, state, { patching : action.patching });
		case DOCUMENT_PATCHED:
			return Object.assign({}, state, { patching : action.patching });
		default :
			return Object.assign({}, state);
	}
}

export default Ui;
