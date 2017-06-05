import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Wizard from '../Components/Wizard'
import Preview from '../Components/Preview'
import { goBack, goNext, updateDocument, patchDocument } from '../Redux/Reducer/Actions'
import Store from '../Redux/App.store.js'
import Validate from '../Components/Validate'

class Edit extends Component {
  constructor(){
    super()
    this.state = {
      data : Store.getState(),
      preview : false,
      valid : {
        status : true
      }
    }
  }
  togglePreview(){
    this.setState({
      preview : !this.state.preview
    })
  }
  save(){
    Store.dispatch(patchDocument())
  }
  update(id, widget, content){
    let state = Object.assign({}, this.state),
        validStatus = Validate.isValid({
          type : widget.type,
          value : content,
          condition : widget.condition,
          touched : true
        })

      state.data.Document.data[id].value = content
      this.setState({ 
        data : state.data,
        valid : validStatus
      })
  }
  render() {
    const preview = this.state.data.Document.meta 
    ?  !this.state.preview 
    ? ( 
        <div className="row">
           <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-grey height-100">
             <Wizard 
             valid={this.state.valid}
             data={this.state.data.Document} 
             back={(widgetId, content)=>{ 
                Store.dispatch(updateDocument(widgetId, content))
                Store.dispatch(goBack())
              }}
             next={(widgetId, content)=>{
                Store.dispatch(updateDocument(widgetId, content))
                Store.dispatch(goNext())
              }}
             update={(id, widget, content)=>{ this.update(id, widget, content)}}
             ></Wizard>
           </div>
           <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 bg-light-grey height-100">
            <button onClick={this.save}>save</button>
             <Preview data={this.state.data.Document} onClick={()=>{this.togglePreview()}}></Preview>
           </div>
         </div>
       )
    : (
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-light-grey height-100">
            <Preview data={this.state.data.Document} onClick={()=>{this.togglePreview()}}></Preview>
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