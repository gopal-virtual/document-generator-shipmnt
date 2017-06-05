import React, { Component } from 'react';

class Wizard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
            <Progress data={{steps : Object.keys(this.props.data.data), currentStep : this.props.data.meta.currentStep}}></Progress>
            <Modal 
              currentModule={{
                id : this.props.data.meta.currentStep,
                content : this.props.data.data[this.props.data.meta.currentStep]
              }}
              back={this.props.back}
              next={this.props.next}
              update={this.props.update}
              valid={this.props.valid}
            ></Modal>
          </div>
        </div>
        <Status></Status>
      </div>
    );
  }
}

class Progress extends Component {
  render (){
    const percent = ~~((this.props.data.currentStep/this.props.data.steps.length) * 100)
    return (
      <div className="progress-wrapper">
        <div className="progress-number">
          <div className="progress" style={{width: '100%'}}>
            <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" style={{minWidth : `${percent}%`}}>
              {this.props.data.currentStep} / {this.props.data.steps.length}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Modal extends Component {
  renderWidget(widget, onChangeHandler){
    switch(widget.type){
      case 'text' :
        return <input placeholder={`Type ${widget.desc.toLowerCase()}`} ref={input=> this.input = input} autoFocus className="form-control" type="text" value={widget.value} onChange={onChangeHandler}/>
      case 'textarea' :
        return <textarea placeholder={`Type ${widget.desc.toLowerCase()}`} ref={input=> this.input = input} autoFocus className="form-control vertical" type="text" value={widget.value} onChange={onChangeHandler}/>
      case 'number' :
        return <input placeholder={`Type ${widget.desc.toLowerCase()}`} ref={input=> this.input = input} autoFocus className="form-control vertical" type="number" value={widget.value} onChange={onChangeHandler}/>
      default :
        return <input placeholder={`Type ${widget.desc.toLowerCase()}`} ref={input=> this.input = input} autoFocus className="form-control" type="text" value={widget.value} onChange={onChangeHandler}/>
    }
  }
  render(){
    return (
      <div className="modal-wrapper">
        <div className="panel">
          <div className="panel-heading">
            <div className="panel-title">{this.props.currentModule.content.desc}</div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              {
                this.renderWidget(
                  this.props.currentModule.content,
                  ()=>{ 
                    this.props.update(
                      this.props.currentModule.id,
                      this.props.currentModule.content,
                      this.input.value
                    ) 
                  }
                )
              }
            </div>
            {
              !this.props.valid.status &&
              <div className="form-group">
                <div className="alert alert-danger" role="alert">{this.props.valid.msg}</div>
              </div>
            }
          </div>
          <div className="panel-footer">
            <button disabled={!this.props.valid.status} className="btn btn-default pull-left" onClick={()=>{this.props.back(this.props.currentModule.id, this.input.value)}}>Back</button>
            <button disabled={!this.props.valid.status} className="btn btn-default pull-right" onClick={()=>{this.props.next(this.props.currentModule.id, this.input.value)}}>Next</button>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}

class Status extends Component {
  render(){
    return (
      <div className="footer center">...Auto Saved</div>
    )
  }
}

export default Wizard;