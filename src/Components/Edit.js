import React, { Component } from 'react';
import Wizard from '../Components/Wizard'
import Preview from '../Components/Preview'

import 'bootstrap/dist/css/bootstrap.css';
import '../Style/Bootstrap.custom.css';

class Edit extends Component {
  constructor(){
    super()
    this.state = {
      currentStep : 10,
      preview : false,
      meta : { width : 820, height : 1160 },
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
  togglePreview(){
    this.setState({
      preview : !this.state.preview
    })
  }
  render() {
    return (
      <div className="container-fluid">
        {
          !this.state.preview
          ? (
              <div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-7 bg-grey height-100">
                  <Wizard data={this.state} onClick={(step)=>{this.changeStep(step)}}></Wizard>
                </div>
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-5 bg-light-grey">
                  <Preview data={this.state} onClick={()=>{this.togglePreview()}}></Preview>
                </div>
              </div>
          )
          : (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 bg-light-grey">
              <Preview data={this.state} onClick={()=>{this.togglePreview()}}></Preview>
            </div>
          )
        }
      </div>
    );
  }
}

export default Edit;