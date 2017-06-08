class TemplateGenerator {
  static toHtmlString(data, template, callback){
    if(!data || !template) return null;

    let htmlString = template.replace(/\n/g,'');
    data.forEach((item, index) =>{
      let pattern = new RegExp(`\\[\\[(${index})\\]\\]`,'i')
      htmlString = htmlString.replace(pattern, (callback && callback(item.value, index)) || item.value)
    })

    return htmlString
  }
}

export default TemplateGenerator;
