import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { fetchDocument, createDocument } from '../Redux/Reducer/Actions'
import Store from '../Redux/App.store';

class Home extends Component {
  componentDidMount(){
    this.unsubscribe = Store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  selectDocument(type, id){
    if(type === 'Templates'){
      Store.dispatch(createDocument(id))
    }
    else{
      Store.dispatch(fetchDocument(id))
    }
  }

  render() {
    const State = Store.getState()
    return (
      <div>
        { !State.Document.meta 
          ? (
              <div className="container-fluid">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-grey height-100">
                  <h5 className="text-center margin-tb-15 fg-light-grey">Select a document to start</h5>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                      {
                        State.Meta.recentDocuments &&
                        <DocumentList type="Recent" list={State.Meta.recentDocuments} onClick={this.selectDocument} ></DocumentList>
                      }
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                      { State.Meta.templateList &&
                        <DocumentList type="Templates" list={State.Meta.templateList} onClick={this.selectDocument} ></DocumentList>
                      }
                    </div>
                  </div>
                </div>
              </div>
            )
          : <Redirect push to={{pathname: `/edit/${State.Document.meta.id}`}}/>
        }
      </div>
    );
  }
}

const DocumentList = (props) =>
  <div>
    <ul className="document-list">
      <lh>{props.type}</lh>
      {
        props.list
          .map((doc)=>{
            return (
              <li key={doc.id} className="animation-fade-in-from-bottom">
                <div className="document-title">{doc.name}</div>
                <div className="document-thumbnail" onClick={()=>{ props.onClick(props.type, doc.id) }}>Edit</div>
              </li>
            )    
          })
      }
    </ul>
  </div>

export default Home;