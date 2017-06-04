import expect from 'expect'
import Document from '../Redux/Reducer/Document'
import deepFreeze from 'deep-freeze'

describe('Document reducer test', function() {
	describe('Wizard Navigation', function() {
		it('should go next', function() {
			const beforeState = { meta : { currentStep : 2 }, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 3 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, { type : 'GO_NEXT'})).toEqual(afterState)
		});
		it('should go back', function() {
			const beforeState = { meta : { currentStep : 2 }, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 1 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, { type : 'GO_BACK'})).toEqual(afterState)
		});
		it('should not go beyond max step', function() {
			const beforeState = { meta : { currentStep : 3 }, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 3 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, { type : 'GO_NEXT'})).toEqual(afterState)
		});
		it('should not go beyond min step', function() {
			const beforeState = { meta : { currentStep : 1 }, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 1 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, { type : 'GO_BACK'})).toEqual(afterState)
		});
		it('should return max step, when step greater than max step', function() {
			const beforeState = { meta : { currentStep : 10 }, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 3 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, { type : 'GO_NEXT'})).toEqual(afterState)
		});
		it('should return min step, when step is less than min step', function() {
			const beforeState = { meta : { currentStep : - 10}, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 1 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, { type : 'GO_BACK'})).toEqual(afterState)
		});
		it('should return current state, for undefined action', function() {
			const beforeState = { meta : { currentStep : 2 }, data : { 1 : {}, 2 : {}, 3 : {} } },
				afterState = { meta : { currentStep : 2 }, data : { 1 : {}, 2 : {}, 3 : {} } };
				deepFreeze(beforeState)
		  expect(Document(beforeState, {})).toEqual(afterState)
		});
	});
})
