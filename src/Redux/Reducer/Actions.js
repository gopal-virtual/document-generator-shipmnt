import Database from '../../Database'
import Store from '../App.store'

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
    return Database.ref('/meta').once('value')
    .then(snap => {
      dispatch(receiveDocumentList(snap.val()))
    }, (error) => console.log(error))
  }
}

export function fetchDocument(id) {

  return function (dispatch) {

    dispatch(requestDocument())
    return Database.ref(`/docs/${id}`).once('value')
    .then(snap => {
      dispatch(receiveDocument(snap.val(), id))
    }, (error) => console.log(error))
  }
}

export function patchDocument() {

  return function (dispatch) {
    let doc = Store.getState().Document
    dispatch(patchingDocument())
    return Database.ref(`/docs/${doc.meta.id}`).set({
      data : doc.data,
      meta : doc.meta,
      template : doc.template
    })
    .then(()=>{
      return Database.ref(`/meta/recentDocuments/${doc.meta.id}`).set({ id : doc.meta.id, name : doc.meta.name })
    })
    .then(()=>{ dispatch(documentPatched())})
  }
}

export function createDocument(id) {
  return function (dispatch) {
    dispatch(requestDocument())
    return Database.ref(`/docs/${id}`).once('value')
    .then(snap => {
        const doc = snap.val(),
              newRef = Database.ref(`/docs/`).push()

        newRef.set({
          data : doc.data,
          meta : Object.assign({}, doc.meta, { id : newRef.key }),
          template : doc.template
        }).then(()=>{
          return Database.ref(`/meta/recentDocuments/${newRef.key}`).set({ id : newRef.key, name : doc.meta.name })
        }).then(()=>dispatch(receiveDocument(doc, newRef.key)))
    },  (error) => console.log(error))
  }
}
