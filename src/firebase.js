import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyA2Z5yoTNm0GdCDR1P4aazfvQxv6VdbQEQ",
    authDomain: "clases-app-42a0a.firebaseapp.com",
    databaseURL: "https://clases-app-42a0a.firebaseio.com",
    projectId: "clases-app-42a0a",
    storageBucket: "clases-app-42a0a.appspot.com",
    messagingSenderId: "1064941752978",
    appId: "1:1064941752978:web:5ca7f97a5b3cdfc28b0c4b",
    measurementId: "G-Q610XK6ZMJ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();

export {firebase, db, auth}
