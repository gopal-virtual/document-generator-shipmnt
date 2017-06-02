import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './Components/Home'
import Edit from './Components/Edit'

import 'bootstrap/dist/css/bootstrap.css';
import './Style/index.css'

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/edit" component={Edit}/>
        </div>
      </Router>
    );
  }
}

export default App;