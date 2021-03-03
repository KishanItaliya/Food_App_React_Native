import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCRZucaeoVSQ7O2c1PIbq_HNnxZ9nsrsBY",
  authDomain: "aahar-c00aa.firebaseapp.com",
  projectId: "aahar-c00aa",
  storageBucket: "aahar-c00aa.appspot.com",
  messagingSenderId: "648242669672",
  appId: "1:648242669672:web:314d5e4db3137919c573dd",
  measurementId: "G-TVH3KE25S4",
};

firebase.initializeApp(config);

// const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default firebase;
