// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";





  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDDaroszG2o7izB-hR-OOi2-FD79p9OMYo",
    authDomain: "instagram-clone-react-f45a8.firebaseapp.com",
    projectId: "instagram-clone-react-f45a8",
    storageBucket: "instagram-clone-react-f45a8.appspot.com",
    messagingSenderId: "1052067831404",
    appId: "1:1052067831404:web:4b8639f510fcf487ca0249",
    measurementId: "G-9L7P14ZG73"
  });
  const db = firebaseApp.firestore();
  
  const auth = firebase.auth();
  const storage= firebase.storage();
  
  export{db, auth, storage};

  //export default db;