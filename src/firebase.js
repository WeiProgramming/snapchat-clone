import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDLSn_-1vbXHhVTgZ3GaZXsJjHaTuaz2ZU",
  authDomain: "snapchat-33b7c.firebaseapp.com",
  projectId: "snapchat-33b7c",
  storageBucket: "snapchat-33b7c.appspot.com",
  messagingSenderId: "390139500950",
  appId: "1:390139500950:web:233355e3eb44ff6165a5b7"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export {db, auth, storage, provider};
