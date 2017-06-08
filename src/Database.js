import firebase from 'firebase'

const config = {
  apiKey: "AIzaSyBK2KnKdhcovpj_B8X8TJZPyB_uL0XPWO4",
  authDomain: "shipmnt-f33da.firebaseapp.com",
  databaseURL: "https://shipmnt-f33da.firebaseio.com",
  projectId: "shipmnt-f33da",
  storageBucket: "shipmnt-f33da.appspot.com",
  messagingSenderId: "225754568529"
};

firebase.initializeApp(config);
const Database = firebase.database();

export default Database;
