import expect from 'expect'
import Document from '../Redux/Reducer/Document'
import Validate from '../Components/Validate'
import deepFreeze from 'deep-freeze'
import TemplateGenerator from '../Components/TemplateGenerator'

describe('App test', function() {
    describe('Wizard Navigation', function() {
        it('should go next', function() {
            const beforeState = { meta: { currentStep: 2 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 3 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'GO_NEXT' })).toEqual(afterState)
        });
        it('should go back', function() {
            const beforeState = { meta: { currentStep: 2 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 1 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'GO_BACK' })).toEqual(afterState)
        });
        it('should not go beyond max step', function() {
            const beforeState = { meta: { currentStep: 3 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 3 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'GO_NEXT' })).toEqual(afterState)
        });
        it('should not go beyond min step', function() {
            const beforeState = { meta: { currentStep: 1 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 1 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'GO_BACK' })).toEqual(afterState)
        });
        it('should return max step, when step greater than max step', function() {
            const beforeState = { meta: { currentStep: 10 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 3 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'GO_NEXT' })).toEqual(afterState)
        });
        it('should return min step, when step is less than min step', function() {
            const beforeState = { meta: { currentStep: -10 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 1 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'GO_BACK' })).toEqual(afterState)
        });
        it('should return current state, for undefined action', function() {
            const beforeState = { meta: { currentStep: 2 }, data: { 1: {}, 2: {}, 3: {} } },
                afterState = { meta: { currentStep: 2 }, data: { 1: {}, 2: {}, 3: {} } };
            deepFreeze(beforeState)
            expect(Document(beforeState, {})).toEqual(afterState)
        });
    });

    describe('Document Update', function() {
        it('should update document', function() {
            const oldValue = "abcd",
                newValue = "efgh",
                beforeState = { meta: { currentStep: 2 }, data: [ {}, {}, { value: oldValue } ] },
                afterState = { meta: { currentStep: 2 }, data: [ {}, {}, { value: newValue } ] };

            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'UPDATE_DOCUMENT', widgetId: 2, content: newValue })).toEqual(afterState)
        })
        it('should return previous document state', function() {
            const oldValue = "abcd",
                newValue = "efgh",
                beforeState = { meta: { currentStep: 2 }, data: [ {}, {}, { value: oldValue } ] },
                afterState = { meta: { currentStep: 2 }, data: [ {}, {}, { value: oldValue } ] };

            deepFreeze(beforeState)
            expect(Document(beforeState, { type: 'UPDATE_DOCUMENT', widgetId: 3, content: newValue })).toEqual(afterState)
        })
    })

    describe('Document fetch, update', function() {
      it('should return previous document state', function() {
        const beforeState = {},
        afterState = { meta: { currentStep: 2 , id : 1}, data: [ {}, {}, { value: 'oldValue' } ] };

        deepFreeze(beforeState)
        expect(Document(beforeState, { type: 'RECEIVE_DOCUMENT', data: afterState, id : 1 })).toEqual(afterState)
      })
    })

    describe('Validate', function() {

        describe('Text Input', function() {
            it('should be valid, value length in the range', function() {
                const input = { type: 'text', value: 'abcdabcd', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: true }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid, value length outside the range', function() {
                const input = { type: 'text', touched: true, value: 'abcdabcdabcd', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: false, msg: 'Content should be of maximum 10 characters' }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid, value length outside the range', function() {
                const input = { type: 'text', touched: true, value: 'abcd', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: false, msg: 'Content should be of minimum 5 characters' }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid, predefined value, but not touched', function() {
                const input = { type: 'text', touched: false, value: 'abcd', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: false, msg: 'Content should be of minimum 5 characters' }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid, touched, not dirty', function() {
                const input = { type: 'text', touched: true, value: '', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: false, msg: 'Content should be of minimum 5 characters' }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be valid, value length equal to max range', function() {
                const input = { type: 'text', touched: true, value: 'abcdabcdab', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: true }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be valid, value length equal to min range', function() {
                const input = { type: 'text', touched: true, value: 'abcda', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: true }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be valid, input not touched', function() {
                const input = { type: 'text', touched: false, value: '', condition: { minLength: 5, maxLength: 10 } },
                    output = { status: true }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
        })


        describe('Number Input', function() {
            const pattern = '[9|8|7]\\d{9}'
            const desc = 'should start with 9, 8 or 7 and a total digit of 10'
            it('should be invalid, input is not a number', function() {
                const input = { type: 'number', touched: false, value: 'abcd1234', condition: {} },
                    output = { status: false, msg: 'Its not a number' }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be valid, input is a number', function() {
                const input = { type: 'number', touched: false, value: '1234', condition: {} },
                    output = { status: true }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid, input does not match the given pattern', function() {
                const input = { type: 'number', touched: false, value: '1234', condition: { pattern: { pattern: pattern, desc: desc } } },
                    output = { status: false, msg: `Input number should ${desc.toLowerCase()}` }
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid, input is out of range', function() {
                const input = { type: 'number', touched: false, value: '123412341234512345', condition: { pattern: { pattern: pattern, desc: desc } } },
                    output = { status: false, msg: `Input number should ${desc.toLowerCase()}` }
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be valid, input matches the given pattern', function() {
                const input = { type: 'number', touched: false, value: '9123456789', condition: { pattern: { pattern: pattern, desc: desc } } },
                    output = { status: true }
                expect(Validate.isValid(input)).toEqual(output)
            });
        })


        describe('Email Input', function() {
            const pattern = "^[a-z0-9\\.]+@[a-z0-9\\.-]+\\.[a-z]{2,}$"
            const desc = "valid characters : a to z, 0 to 9 and only . - can be used"
            it('should be invalid email', function() {
                const input = { type: 'email', touched: false, value: 'abcd1234', condition: { pattern : { pattern: pattern, desc: desc } } },
                    output = { status: false, msg: desc }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be invalid email', function() {
                const input = { type: 'email', touched: false, value: '$%^#$@##$#$.com', condition: { pattern : { pattern: pattern, desc: desc } } },
                    output = { status: false, msg: desc }
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
            it('should be valid email', function() {
                const input = { type: 'email', touched: false, value: 'hello@gmail.com', condition: { pattern : { pattern: pattern, desc: desc } } },
                    output = { status: true}
                deepFreeze(input)
                expect(Validate.isValid(input)).toEqual(output)
            });
        })


        describe('Date Input', function() {
            const pattern = "^[0-9]{2}-[0-9]{2}-[0-9]{4}$"
            const desc = "invalid date"
              it('should be valid date', function() {
                  const input = { type: 'date', touched: false, value: '01-03-2017', condition: { pattern : { pattern: pattern, desc: desc } } },
                      output = { status: true}
                  deepFreeze(input)
                  expect(Validate.isValid(input)).toEqual(output)
              });
              it('should be invalid date', function() {
                  const input = { type: 'date', touched: false, value: '2', condition: { pattern : { pattern: pattern, desc: desc } } },
                      output = { status: false , msg : desc}
                  deepFreeze(input)
                  expect(Validate.isValid(input)).toEqual(output)
              });
        })
    })

    describe('Template Converter', function() {
        it('should convert pseudo html to html string', function() {
            const pseudoHtml = `<div><h1>[[0]]</h1><p>[[1]]</p><h3>[[2]]</h3><p>[[3]]</p></div>`,
                data = [ { value : 'Heading 1'}, { value : 'Description 1'}, { value : 'Heading 2'}, { value : 'Description 2'} ],
                output = `<div><h1>Heading 1</h1><p>Description 1</p><h3>Heading 2</h3><p>Description 2</p></div>`

            deepFreeze(pseudoHtml)
            deepFreeze(data)
            expect(TemplateGenerator.toHtmlString(data, pseudoHtml)).toEqual(output)
        })

        it('should convert pseudo html to html string, with inproper psedohtml', function() {
          const pseudoHtml = `<div><h1>[[0]]</h1></div>`,
          data = [ { value : 'Heading 1'}, { value : 'Description 1'}, { value : 'Heading 2'}, { value : 'Description 2'} ],
          output = `<div><h1>Heading 1</h1></div>`

          deepFreeze(pseudoHtml)
          deepFreeze(data)
          expect(TemplateGenerator.toHtmlString(data, pseudoHtml)).toEqual(output)
        })

        it('should convert pseudo html to html string, with inproper data', function() {
          const pseudoHtml = `<div><h1>[[0]]</h1><p>[[1]]</p><h3>[[2]]</h3><p>[[3]]</p></div>`,
          data = [ { value : 'Heading 1'}, { value : 'Description 2'} ],
          output = `<div><h1>Heading 1</h1><p>Description 2</p><h3>[[2]]</h3><p>[[3]]</p></div>`

          deepFreeze(pseudoHtml)
          deepFreeze(data)
          expect(TemplateGenerator.toHtmlString(data, pseudoHtml)).toEqual(output)
        })

        it('should convert pseudo html to html string, with undefined inputs', function() {
          const pseudoHtml = undefined,
          data = undefined,
          output = null
          expect(TemplateGenerator.toHtmlString(data, pseudoHtml)).toEqual(output)
        })
    })

})
