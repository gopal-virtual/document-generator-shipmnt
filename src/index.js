import 'babel-polyfill'
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './App';
import { fetchDocumentList } from './Redux/Reducer/Actions'
import Store from './Redux/App.store';
import './Style/index.css';

const render = ()=>{
	ReactDOM.render(
	  <AppRouter state={Store.getState()}/>,
	  document.getElementById('root')
	);
}

Store.subscribe(render)
Store.dispatch(fetchDocumentList())
