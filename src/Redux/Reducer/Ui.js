import { DOCUMENT_PATCHING, DOCUMENT_PATCHED } from '../../Redux/Reducer/Actions'

const Ui = (state = { patching : false }, action) => {
	switch(action.type){
		case DOCUMENT_PATCHING:
			return Object.assign({}, state, { patching : action.patching });
		case DOCUMENT_PATCHED:
			return Object.assign({}, state, { patching : action.patching });
		default :
			return Object.assign({}, state);
	}
}

export default Ui;