import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../Redux/Reducer/Root'

const Store = createStore(
		rootReducer, 
		applyMiddleware(
			thunkMiddleware,
			createLogger
		)
	)

export default Store