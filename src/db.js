

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCwsHmy7bRJ2KgV9LrkXQcL90ThWgld--I",
  authDomain: "hotelreservationvue.firebaseapp.com",
  projectId: "hotelreservationvue",
  storageBucket: "hotelreservationvue.appspot.com",
  messagingSenderId: "729239872897",
  appId: "1:729239872897:web:c764bfb3136ec292783480"
};

const db = firebase.initializeApp(firebaseConfig);

export default db;