import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Wizard from '../Components/Wizard'
import Preview from '../Components/Preview'
import { goBack, goNext } from '../Redux/Reducer/Actions'
import Store from '../Redux/App.store.js'

class Edit extends Component {
  togglePreview(){
    console.log('preview')
  }
  render() {
    const preview = this.props.state.Document.meta 
    ?  true 
    ? ( 
        <div className="row">
           <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-grey height-100">
             <Wizard 
             data={this.props.state.Document} 
             back={()=>{ Store.dispatch(goBack())}}
             next={()=>{ Store.dispatch(goNext())}}
             ></Wizard>
           </div>
           <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 bg-light-grey height-100">
             <Preview data={this.props.state.Document} onClick={()=>{this.togglePreview()}}></Preview>
           </div>
         </div>
       )
    : (
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-light-grey height-100">
            <Preview data={this.props.state.Document} onClick={()=>{this.togglePreview()}}></Preview>
          </div>
        </div>
      )
    :  <Redirect push to={{pathname: '/'}}/>;

    return (
      <div className="container-fluid">
        { preview }
      </div>
    );
  }
}

export default Edit;