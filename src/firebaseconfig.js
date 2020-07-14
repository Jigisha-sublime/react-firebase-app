import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBIntG_xdUY-xCy2Lok8XTc9UAh8NzaMx0",
  authDomain: "social-media-clone-47ce0.firebaseapp.com",
  databaseURL: "https://social-media-clone-47ce0.firebaseio.com",
  projectId: "social-media-clone-47ce0",
  storageBucket: "social-media-clone-47ce0.appspot.com",
  messagingSenderId: "458169002958",
  appId: "1:458169002958:web:8fba0e2967fb93f443599f",
  measurementId: "G-JPKCBXJNPD"
})

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };