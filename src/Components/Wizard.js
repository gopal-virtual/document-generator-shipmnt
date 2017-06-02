import React, { Component } from 'react';

class Wizard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-10 col-md-offset-1 col-lg-10 col-lg-offset-1">
            <Progress data={{steps : Object.keys(this.props.data.data), currentStep : this.props.data.currentStep}}></Progress>
            <Modal currentModule={this.props.data.data[this.props.data.currentStep]} onClick={this.props.onClick}></Modal>
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
  render(){
    return (
      <div className="modal-wrapper">
        <div className="panel">
          <div className="panel-heading">
            <div className="panel-title">{this.props.currentModule.desc}</div>
          </div>
          <div className="panel-body">
            {this.props.currentModule.value}
          </div>
          <div className="panel-footer">
            <button className="btn btn-default pull-left" onClick={()=>{this.props.onClick(-1)}}>Back</button>
            <button className="btn btn-default pull-right" onClick={()=>{this.props.onClick(1)}}>Next</button>
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