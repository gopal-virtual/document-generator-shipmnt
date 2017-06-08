class Validate {
	static isValid(config){
		if(	!config.touched
			&& !config.value.length)
			return {
				status : true }
		switch(config.type){
			case 'text':
				console.log(config.type)
				if(	config.condition.minLength
					&& config.value.length < config.condition.minLength){
					return {
						status : false,
						msg : `Content should be of minimum ${config.condition.minLength} characters`};
				}
				if( config.condition.maxLength
					&& config.value.length > config.condition.maxLength){
					return {
						status : false,
						msg : `Content should be of maximum ${config.condition.maxLength} characters`};
				}
				return {
					status : true };
			case 'textarea':
				console.log(config.type)
				if(	config.condition.minLength
					&& config.value.length < config.condition.minLength){
					return {
						status : false,
						msg : `Content should be of minimum ${config.condition.minLength} characters`};
				}
				if( config.condition.maxLength
					&& config.value.length > config.condition.maxLength){
					return {
						status : false,
						msg : `Content should be of maximum ${config.condition.maxLength} characters`};
				}
				return {
					status : true };
			case 'number':
				if(isNaN(config.value)){
					return {
						status : false,
						msg : 'Its not a number'}
				}
				if( config.condition.minLength
					&& config.value.length < config.condition.minLength){
					return {
						status : false,
						msg : `Number should be of minimum ${config.condition.minLength} digits`};
				}
				if( config.condition.maxLength
					&& config.value.length > config.condition.maxLength){
					return {
						status : false,
						msg : `Number should be of maximum ${config.condition.maxLength} digits`};
				}
				if( config.condition.pattern
					&& config.value.match(new RegExp(config.condition.pattern.pattern)) === null){
					return {
						status : false,
						msg : `Input number should ${config.condition.pattern.desc.toLowerCase()}`}
				}
				return {
					status : true };
			case 'email':
				if( config.condition.pattern
					&& config.value.match(new RegExp(config.condition.pattern.pattern)) === null){
					return {
						status : false,
						msg : config.condition.pattern.desc.toLowerCase()}
				}
				return { status : true };
			case 'date' :
				if(	!(new Date(config.value) !== 'Invalid Date'
					&& config.condition.pattern
					&& config.value.match(new RegExp(config.condition.pattern.pattern)))){
					return {
						status : false,
						msg : config.condition.pattern.desc.toLowerCase()}
				}
				return {
					status : true };
			default :
				return {
					status : false,
					msg : 'Invalid Content'};
		}
	}
}

export default Validate;
