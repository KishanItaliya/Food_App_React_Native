import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  // apiKey: "AIzaSyCRZucaeoVSQ7O2c1PIbq_HNnxZ9nsrsBY",
  // authDomain: "aahar-c00aa.firebaseapp.com",
  // projectId: "aahar-c00aa",
  // storageBucket: "aahar-c00aa.appspot.com",
  // messagingSenderId: "648242669672",
  // appId: "1:648242669672:web:314d5e4db3137919c573dd",
  // measurementId: "G-TVH3KE25S4",
  apiKey: "AIzaSyDIf-K1XEoOiDDmSZ3OnBMP-U3heB1JOj0",
  authDomain: "food-review-308615.firebaseapp.com",
  projectId: "food-review-308615",
  storageBucket: "food-review-308615.appspot.com",
  messagingSenderId: "162826915236",
  appId: "1:162826915236:web:1e07747af940e3a8774531",
  measurementId: "G-G6KJEFZJTJ",
};

firebase.initializeApp(config);

// const db = firebaseApp.firestore();
// const auth = firebase.auth();

export default firebase;
