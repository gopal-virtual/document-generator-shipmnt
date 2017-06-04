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
          <Route exact path="/" component={() => (<Home state={this.props.state}/>)}/>
          <Route exact path="/edit/:id" component={({match}) => (<Edit state={this.props.state} match={match}/>)}/>
        </div>
      </Router>
    );
  }
}

export default App;