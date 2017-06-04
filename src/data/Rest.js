class Rest {
	static getRecentDocs(){
		return new Promise((resolve,reject)=>{
			resolve(['doc101','doc102'])
		})
	}
	static getTemplatesList(){
		return new Promise((resolve,reject)=>{
			resolve([101,102])
		})
	}
	static getTemplate(id){}
	static save(id, doc){}
}

export default Rest;