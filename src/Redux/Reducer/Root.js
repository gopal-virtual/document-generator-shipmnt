import Meta from '../../Redux/Reducer/Meta'
import Document from '../../Redux/Reducer/Document'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	Meta,
	Document
})

export default rootReducer
