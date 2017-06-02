import React, { Component } from 'react';

class Preview extends Component {
  render() {
    return (
      <div>
        <ActionHeader 
          onClick={this.props.onClick}
          preview={this.props.data.preview}>
          </ActionHeader>
        <Document 
          currentStep={this.props.data.currentStep} 
          data={this.props.data.data}
          preview={this.props.data.preview}
          width={this.props.data.meta.width} 
          height={this.props.data.meta.height}
          ></Document>
      </div>
    );
  }
}
class ActionHeader extends Component {
  render(){
    return (
      <div className="row">
        <div className="action-header">
          <div className={
            this.props.preview
            ? 'col-xs-8 col-sm-8 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'
            : 'col-xs-8 col-sm-8 col-md-12 col-lg-12'
          }>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-left">
              <span onClick={this.props.onClick}><i className="glyphicon glyphicon-fullscreen"></i> Preview</span>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 center">
              <span>Document Title</span>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 text-right">
              <button className="btn btn-default">Download</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Document extends Component {
  componentDidMount(){
    let padding = 25,
        scrollW = 10,
        offset = padding * 2 + scrollW,
        wrapper = document.querySelector('.document-wrapper'),
        width = wrapper.offsetWidth,
        elem = document.querySelector('.document'),
        factor = ((width - offset) / this.props.width).toFixed(2)

    elem.style.width = `${this.props.width}px`
    elem.style.height = `${this.props.height}px`
    elem.style.transform = `scale(${factor},${factor})`
  }
  render(){
    return (
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 overflow-y-scroll">
          <div className={
            this.props.preview
            ? 'col-xs-8 col-sm-8 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 document-wrapper'
            : 'col-xs-8 col-sm-8 col-md-12 col-lg-12 document-wrapper'
          }>
            <div className="document">
              <div className="row">
                <div className="col-xs-8 col-sm-8 col-md-8 col-lg-8">
                  <h4>
                    <Widget data={{step : 1, currentStep : this.props.currentStep, data : this.props.data[1]}}/><br/>
                    <small>
                      <Widget data={{step : 2, currentStep : this.props.currentStep, data : this.props.data[2]}}/><br/>
                      Tel : <Widget data={{step : 3, currentStep : this.props.currentStep, data : this.props.data[3]}}/>,
                      Fax : <Widget data={{step : 4, currentStep : this.props.currentStep, data : this.props.data[4]}}/><br/>
                      Website : <Widget data={{step : 5, currentStep : this.props.currentStep, data : this.props.data[5]}}/>
                    </small>
                  </h4>
                  <div>
                    <Widget data={{step : 6, currentStep : this.props.currentStep, data : this.props.data[6]}}/><br/>
                    <Widget data={{step : 7, currentStep : this.props.currentStep, data : this.props.data[7]}}/><br/>
                  </div>
                  <h5>Dear, <Widget data={{step : 8, currentStep : this.props.currentStep, data : this.props.data[8]}}/></h5>
                </div>
                <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                  <h3>
                    Quotation<br/>
                  <small>Biz Reg No : <Widget data={{step : 9, currentStep : this.props.currentStep, data : this.props.data[9]}}/></small>
                  </h3>
                  <div>
                    Quotation No. <Widget data={{step : 10, currentStep : this.props.currentStep, data : this.props.data[10]}}/><br/>
                    Date <Widget data={{step : 11, currentStep : this.props.currentStep, data : this.props.data[11]}}/><br/>
                    Our Ref. <Widget data={{step : 12, currentStep : this.props.currentStep, data : this.props.data[12]}}/><br/>
                    Cust Ref. <Widget data={{step : 13, currentStep : this.props.currentStep, data : this.props.data[13]}}/><br/>
                    Terms <Widget data={{step : 14, currentStep : this.props.currentStep, data : this.props.data[14]}}/><br/>
                  </div>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <table className="table">
                    <thead>
                      <tr>
                        <th colSpan="2">S/No Product ID Description Of Work</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                        <Widget data={{step : 15, currentStep : this.props.currentStep, data : this.props.data[15]}}/>
                        </td>
                        <td></td>
                        <td><strong><Widget data={{step : 16, currentStep : this.props.currentStep, data : this.props.data[16]}}/></strong></td>
                      </tr>
                      <tr><th colSpan="3">Remarks</th></tr>
                      <tr>
                        <td rowSpan="2">
                          <Widget data={{step : 17, currentStep : this.props.currentStep, data : this.props.data[17]}}/>
                        </td>
                        <td>
                          Tax
                        </td>
                        <td>
                          <strong><Widget data={{step : 18, currentStep : this.props.currentStep, data : this.props.data[18]}}/></strong>
                        </td>
                      </tr>
                      <tr>
                        <td>Total</td>
                        <td><strong><Widget data={{step : 19, currentStep : this.props.currentStep, data : this.props.data[19]}}/></strong></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                  <div className="signature-block">
                    <div className="signature-space"></div>
                    <div className="signature-particular">
                      for ABC Painting and Renovations
                    </div>
                  </div>
                  <div className="signature-block">
                    <div className="signature-space"></div>
                    <div className="signature-particular">
                      to accept, please sign and fax back
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class Widget extends Component{
  render(){
    return (
      <span className={this.props.data.step === this.props.data.currentStep ? 'highlight-widget' : ''}>
        {this.props.data.data.value}
      </span>
    )
  }
}


export default Preview;