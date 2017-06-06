import Ui from '../../Redux/Reducer/Ui'
import Meta from '../../Redux/Reducer/Meta'
import Document from '../../Redux/Reducer/Document'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	Ui,
	Meta,
	Document
})

export default rootReducer
