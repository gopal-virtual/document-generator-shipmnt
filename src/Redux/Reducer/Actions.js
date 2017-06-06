import fetch from 'isomorphic-fetch'
import Store from '../App.store'
import $ from 'jquery'

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
    data: json
  }
}

export const UPDATE_DOCUMENT = 'UPDATE_DOCUMENT'
export function updateDocument(widgetId, content) {
  return {
    type: UPDATE_DOCUMENT,
    widgetId: widgetId,
    content : content
  }
}
export const UPDATE_DOCUMENT_META = 'UPDATE_DOCUMENT_META'
export function updateDocumentMeta(key, value) {
  return {
    type: UPDATE_DOCUMENT_META,
    key: key,
    value : value
  }
}

export const DOCUMENT_PATCHING = 'DOCUMENT_PATCHING'
export function patchingDocument() {
  return {
    type: DOCUMENT_PATCHING,
    patching : true
  }
}

export const DOCUMENT_PATCHED = 'DOCUMENT_PATCHED'
export function documentPatched() {
  return {
    type: DOCUMENT_PATCHED,
    patching : false
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
      .then(json => {
          dispatch(receiveDocument(json))
        }
      )
      .catch(error => console.log(error))
  }
}

export function patchDocument(id) {

  return function (dispatch) {
    dispatch(patchingDocument())

    let doc = Store.getState().Document
    let settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:9000/patch/doc",
      "method": "PATCH",
      "headers": {
        "content-type": "application/json",
      },
      "processData": false,
      "data": JSON.stringify({
        id : doc.meta.id,
        data : doc
      })
    }

    $.ajax(settings)
    .done(function (response) {
      dispatch(documentPatched(response))
    })
    .fail(function(status) {
        console.log(status)
    })
  }
}

export function createDocument(id) {

  return function (dispatch) {
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://localhost:9000/create/doc",
      "method": "POST",
      "headers": {
        "content-type": "application/json",
      },
      "processData": false,
      "data": JSON.stringify({ id : id })
    }

    $.ajax(settings)
    .done(function (response) {
      dispatch(receiveDocument(response))
    })
    .fail(function(status) {
        console.log(status)
    })
  }
}
