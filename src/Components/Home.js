import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { fetchDocument } from '../Redux/Reducer/Actions'
import Store from '../Redux/App.store';

class Home extends Component {
  render() {
    return (
      <div>
        { !this.props.state.Document.meta 
          ? (
              <div className="container-fluid">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-grey height-100">
                  <h5 className="text-center margin-tb-15 fg-light-grey">Select a document to start</h5>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                      {
                        this.props.state.Meta.recentDocuments &&
                        <DocumentList type="Recent" list={this.props.state.Meta.recentDocuments}></DocumentList>
                      }
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                      { this.props.state.Meta.templateList &&
                        <DocumentList type="Templates" list={this.props.state.Meta.templateList}></DocumentList>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          : <Redirect push to={{pathname: `/edit/${this.props.state.Document.meta.id}`}}/>
        }
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
          {
            this.props.list
              .map((id)=>{
                return (
                  <li key={id}>
                    <div className="document-title">{id}</div>
                    <Thumbnail docId={id}></Thumbnail>
                  </li>
                )    
              })
          }
        </ul>
      </div>
    );
  }
}

const Thumbnail = ({ docId }) => 
  <div className="document-thumbnail" onClick={()=>{ 
    Store.dispatch(fetchDocument(docId))
  }}>Edit</div>



export default Home;