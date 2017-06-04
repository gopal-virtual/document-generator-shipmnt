import fetch from 'isomorphic-fetch'

export const GO_BACK = 'GO_BACK'
export function goBack() {
  return {
    type: GO_BACK
  }
}
export const GO_NEXT = 'GO_NEXT'
export function goNext() {
  return {
    type: GO_NEXT
  }
}
export const SELECT_DOCUMENT = 'SELECT_DOCUMENT'
export function selectDocument(documentID) {
  return {
    type: SELECT_DOCUMENT,
    documentID
  }
}

export const SELECT_TEMPLATE = 'SELECT_TEMPLATE'
export function selectTemplate(templateID) {
  return {
    type: SELECT_TEMPLATE,
    templateID
  }
}

export const REQUEST_DOCUMENT_LIST = 'REQUEST_DOCUMENT_LIST'
function requestDocumentList() {
  return {
    type: REQUEST_DOCUMENT_LIST
  }
}

export const RECEIVE_DOCUMENT_LIST = 'RECEIVE_DOCUMENT_LIST'
function receiveDocumentList(json) {
  return {
    type: RECEIVE_DOCUMENT_LIST,
    data: json
  }
}

export const REQUEST_DOCUMENT = 'REQUEST_DOCUMENT'
function requestDocument() {
  return {
    type: REQUEST_DOCUMENT
  }
}

export const RECEIVE_DOCUMENT = 'RECEIVE_DOCUMENT'
function receiveDocument(json, id) {
  return {
    type: RECEIVE_DOCUMENT,
    data: json,
    id : id
  }
}

export function fetchDocumentList() {

  return function (dispatch) {

    dispatch(requestDocumentList())

    return fetch('http://localhost:9000/get/meta')
      .then(response => response.json())
      .then(json =>
        dispatch(receiveDocumentList(json))
      )
      .catch(error => console.log(error))
  }
}

export function fetchDocument(id) {

  return function (dispatch) {

    dispatch(requestDocument())

    return fetch(`http://localhost:9000/get/doc?id=${id}`)
      .then(response => response.json())
      .then(json =>
        dispatch(receiveDocument(json, id))
      )
      .catch(error => console.log(error))
  }
}