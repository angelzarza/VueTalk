import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTeQend4ei2sXObi4vvvq95pDMb8SYWZ0",
  authDomain: "vuetalk-ed472.firebaseapp.com",
  projectId: "vuetalk-ed472",
  storageBucket: "vuetalk-ed472.appspot.com",
  messagingSenderId: "652199737213",
  appId: "1:652199737213:web:16cc022d016485015dbe14",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
