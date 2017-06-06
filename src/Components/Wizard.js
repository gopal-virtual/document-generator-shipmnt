import React, { Component } from 'react';

const Wizard = (props) =>
  <div className="hidden-print">
    <div className="row">
      <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
        <Progress
          percent={~~((props.document.meta.currentStep/Object.keys(props.document.data).length) * 100)}
          steps={Object.keys(props.document.data).length}
          currentStep={props.document.meta.currentStep}/>
        <Modal
          id={props.document.meta.currentStep}
          content={props.document.data[props.document.meta.currentStep]}
          back={props.back}
          next={props.next}
          update={props.update}
          valid={props.valid}
        ></Modal>
      </div>
    </div>
    <Save onClick={props.save} saveStatus={props.saveStatus} valid={props.valid}/>
  </div>

const Progress = (props) =>
  <div className="progress-wrapper animation-fade-in">
    <div className="progress-number">
      <div className="progress" style={{width: '100%'}}>
        <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={props.percent} aria-valuemin="0" aria-valuemax="100" style={{minWidth : `${props.percent}%`}}>
          <strong>{props.currentStep} / {props.steps}</strong>
        </div>
      </div>
    </div>
  </div>

class Modal extends Component {
  renderWidget(widget, onChangeHandler){
    switch(widget.type){
      case 'text' :
        return <input
                  placeholder={`Type ${widget.desc.toLowerCase()}`}
                  ref={input=> this.input = input}
                  autoFocus
                  className="form-control"
                  type="text"
                  value={widget.value}
                  onChange={onChangeHandler}/>
      case 'textarea' :
        return <textarea
                  placeholder={`Type ${widget.desc.toLowerCase()}`}
                  ref={input=> this.input = input}
                  autoFocus
                  className="form-control vertical"
                  rows="10"
                  type="text"
                  value={widget.value}
                  onChange={onChangeHandler}/>
      case 'number' :
        return <input
                  placeholder={`Type ${widget.desc.toLowerCase()}`}
                  ref={input=> this.input = input}
                  autoFocus
                  className="form-control vertical"
                  type="number"
                  value={widget.value}
                  onChange={onChangeHandler}/>
      default :
        return <input
                  placeholder={`Type ${widget.desc.toLowerCase()}`}
                  ref={input=> this.input = input}
                  autoFocus
                  className="form-control"
                  type="text"
                  value={widget.value}
                  onChange={onChangeHandler}/>
    }
  }
  render(){
    return (
      <div className="modal-wrapper">
        <div className="panel animation-fade-in-from-bottom">
          <div className="panel-heading">
            <div className="panel-title"><strong>{this.props.content.desc}</strong></div>
          </div>
          <div className="panel-body">
            <div className="form-group">
              {
                this.renderWidget(
                  this.props.content,
                  ()=>{
                    this.props.update(
                      this.props.id,
                      this.props.content,
                      this.input.value
                    )
                  }
                )
              }
            </div>
            {
              !this.props.valid.status &&
              <div className="form-group animation-fade-in-from-bottom">
                <div className="alert alert-danger" role="alert">{this.props.valid.msg}</div>
              </div>
            }
          </div>
          <div className="panel-footer">
            <button
              disabled={!this.props.valid.status}
              className="btn btn-default pull-left"
              onClick={()=>{this.props.back(this.props.id, this.input.value)}}>Back</button>
            <button
              disabled={!this.props.valid.status}
              className="btn btn-default pull-right"
              onClick={()=>{this.props.next(this.props.id, this.input.value)}}>Next</button>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}

const Save = (props) =>
  <div className="footer center fg-light-blue">
    <button disabled={!props.valid.status} className="btn btn-default btn-sm btn-success" onClick={props.onClick}>Save ( { props.saveStatus ? '...saving' : 'autosave on' } )</button>
  </div>

export default Wizard;
