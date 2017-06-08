import React from 'react'
import TemplateGenerator from '../Components/TemplateGenerator'

const Template = (props) =>
  <div dangerouslySetInnerHTML={{__html: TemplateGenerator.toHtmlString(props.data,props.template, (value, index)=>{
    return `<span class="${props.currentStep === index ? 'highlight-widget' : ''}">${value}</span>`
  }) }} />

export default Template;
