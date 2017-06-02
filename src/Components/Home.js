import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-grey height-100">
          <h5 className="text-center margin-tb-15 fg-light-grey">Select a document to start</h5>
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-10 col-md-1 col-lg-10 col-lg-offset-1">
              <DocumentList type="Recent"></DocumentList>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-10 col-md-1 col-lg-10 col-lg-offset-1">
              <DocumentList type="Templates"></DocumentList>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class DocumentList extends Component {
  render () {
    return (
      <div>
        <ul className="document-list">
          <lh>{this.props.type}</lh>
          <li>
            <div className="document-title">Hello</div>
            <Thumbnail></Thumbnail>
          </li>
          <li>
            <div className="document-title">Hello</div>
            <Thumbnail></Thumbnail>
          </li>
        </ul>
      </div>
    );
  }
}

class Thumbnail extends Component {
  render(){
    return (
      <div className="document-thumbnail">
        <Link to="/edit">Edit</Link>
      </div>
    );
  }
}


export default Home;