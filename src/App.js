import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import './Bootstrap.custom.css'
import './Common.css';
import './Progress.css';
import './Document.css';
import './Template.css';
import './Widget.css';

class App extends Component {
  render(){
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/edit" component={Edit}/>
        </div>
      </Router>
    );
  }
}

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



class Edit extends Component {
  constructor(){
    super()
    this.state = {
      currentStep : 10,
      data : {
        "1" : {
          "type" : "text",
          "desc" : "Company Name",
          "value" : "ABC Painting & Renovators"
        },
        "2" : {
          "type" : "text",
          "desc" : "Address",
          "value" : "123 Springvale Rd, Glen Waverley, Vic 3456, Australia"
        },
        "3" : {
          "type" : "number",
          "desc" : "Phone number",
          "value" : "03-7654-1234"
        },
        "4" : {
          "type" : "number",
          "desc" : "Fax number",
          "value" : "03-7654-1235"
        },
        "5" : {
          "type" : "website",
          "desc" : "Website",
          "value" : "http://www.abc-painting.com, Email : sales@abc-painting.com"
        },
        "6" : {
          "type" : "text",
          "desc" : "To Company name",
          "value" : "Sample Customer Pty"
        },
        "7" : {
          "type" : "text",
          "desc" : "Address",
          "value" : "12 Woodridge Rd"
        },
        "8" : {
          "type" : "text",
          "desc" : "Person name",
          "value" : "Mr William"
        },
        "9" : {
          "type" : "number",
          "desc" : "Registration number",
          "value" : "1234-9876"
        },
        "10" : {
          "type" : "text",
          "desc" : "Quotation number",
          "value" : "QT10000"
        },
        "11" : {
          "type" : "date",
          "desc" : "Date",
          "value" : "12-03-2017"
        },
        "12" : {
          "type" : "text",
          "desc" : "Our Reference number",
          "value" : "9384293"
        },
        "13" : {
          "type" : "text",
          "desc" : "Customer Reference number",
          "value" : "039ADJF"
        },
        "14" : {
          "type" : "text",
          "desc" : "Terms",
          "value" : "sample Terms"
        },
        "15" : {
          "type" : "number",
          "desc" : "Particulars",
          "value" : `Thank you for the opportunity to quote. We are pleased to quote as follows : Painting of office unit at 12 Woodridge Rd. Price includes<br/>
        - All surface preparation</br>
        - 1 undercoat and 2 finishing coats to the color of your choice</br>
        - Supply of paint and labour/ workmanship</br>`
        },
        "16" : {
          "type" : "number",
          "desc" : "Amount",
          "value" : `Rs.12,000.00/-`
        },
        "17" : {
          "type" : "number",
          "desc" : "Remarks",
          "value" : `<p>PAYMENT TERMS : 30% deposit required to start work. Balance 70% on completion</p>
          <p>VALIDITY : 90 days from the date of this quote</p>
          <p>We trust that you will find our quote satisfactory and look forward to working with you. Please contact us should you have any questions at all.</p>`
        },
        "18" : {
          "type" : "number",
          "desc" : "Tax",
          "value" : `Rs.1136.00/-`
        },
        "19" : {
          "type" : "number",
          "desc" : "Total",
          "value" : `Rs.12500.00/-`
        }
      }
    }
  }
  changeStep(step){
    let currentStep = Math.min(Math.max(this.state.currentStep + step, 1), Object.keys(this.state.data).length);
    this.setState({ currentStep : currentStep})
  }
  render() {
    return (
      <div className="container-fluid">
        <Wizard data={this.state} onClick={(step)=>{this.changeStep(step)}}></Wizard>
        <Preview data={this.state}></Preview>
      </div>
    );
  }
}

class Wizard extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-grey height-100">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Progress data={{steps : Object.keys(this.props.data.data), currentStep : this.props.data.currentStep}}></Progress>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-md-offset-3 col-lg-6 col-lg-offset-3">
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
      <ol className="progress-number">
        <div className="progress" style={{width: '100%'}}>
        <div className="progress-bar progress-bar-warning" role="progressbar" aria-valuenow={percent} aria-valuemin="0" aria-valuemax="100" style={{minWidth : `${percent}%`}}>
          {this.props.data.currentStep} / {this.props.data.steps.length}
        </div>
      </div>
      </ol>
    );
  }
}

class Modal extends Component {
  render(){
    return (
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

class Preview extends Component {
  render() {
    return (
      <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 bg-light-grey height-100">
        <ActionHeader></ActionHeader>
        <div style={{height : '80vh', overflowY : 'scroll', overflowX : 'hidden'}}>
          <Document currentStep={this.props.data.currentStep} data={this.props.data.data}></Document>
        </div>
      </div>
    );
  }
}

class ActionHeader extends Component {
  render(){
    return (
      <div className="margin-tb-15">
        <div className="center">Document Title</div>
        <span><i className="glyphicon glyphicon-fullscreen"></i> Preview</span>
        <button className="btn btn-default pull-right">Download</button>
        <div className="clearfix"></div>
      </div>
    );
  }
}

class Document extends Component {
  render(){
    return (
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
    );
  }
}

class Widget extends Component{
  render(){
    return (
      <div className={this.props.data.step === this.props.data.currentStep ? 'highlight-widget' : ''}>
        {this.props.data.data.value}
      </div>
    )
  }
}

export default App;
