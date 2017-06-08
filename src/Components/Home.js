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
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-blue height-100">
                  <h5 className="text-center margin-tb-15 fg-light-blue"><strong>
                    { State.Ui.requesting ? 'Loading...' : 'Select a document to start' }
                  </strong></h5>
                  <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                      {
                        State.Meta.recentDocuments &&
                        <DocumentList type="Recent" list={State.Meta.recentDocuments} onClick={this.selectDocument} requesting={State.Ui.requesting}></DocumentList>
                      }
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
                      { State.Meta.templateList &&
                        <DocumentList type="Templates" list={State.Meta.templateList} onClick={this.selectDocument} requesting={State.Ui.requesting}></DocumentList>
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

class DocumentList extends Component {
  render(){
    return (
      <div>
        <ul className="document-list">
          <lh className="fg-light-blue">{this.props.type}</lh>
          {
            Object.keys(this.props.list)
            .map((key)=>{
              return (
                <li key={key} className="animation-fade-in-from-bottom">
                <div className="document-title truncate">{this.props.list[key].name}</div>
                <div className="document-thumbnail fg-blue" onClick={()=>{
                  this.selected = this.props.list[key].id
                  this.props.onClick(this.props.type, this.props.list[key].id)
                }}>{
                  this.selected === this.props.list[key].id && this.props.requesting ? 'Loading...' : 'Edit'
                }</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

export default Home;
