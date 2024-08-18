// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBCMYVdOAZB7d2GMVY2gYsPp6FEW6hP3E4",
  authDomain: "hspantryapp-89077.firebaseapp.com",
  projectId: "hspantryapp-89077",
  storageBucket: "hspantryapp-89077.appspot.com",
  messagingSenderId: "750985552541",
  appId: "1:750985552541:web:725d111a48704d12c56a74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export {app, firestore};