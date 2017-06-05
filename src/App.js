import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { fetchDocumentList } from './Redux/Reducer/Actions'
import Store from './Redux/App.store';
import Home from './Components/Home'
import Edit from './Components/Edit'

import 'bootstrap/dist/css/bootstrap.css';
import './Style/index.css'

class App extends Component {
  componentDidMount(){
    Store.dispatch(fetchDocumentList())
  }
  render(){
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/edit/:id" component={({match}) => (<Edit match={match}/>)}/>
        </div>
      </Router>
    );
  }
}

export default App;