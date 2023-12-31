// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/compat/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  Auth,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updateProfile,
  updatePassword,
  deleteUser,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
  measurementId: process.env.REACT_APP_MENTID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const crUser = auth.currentUser;
export {
  auth,
  createUserWithEmailAndPassword,
  app,
  signOut,
  signInWithEmailAndPassword,
  updateEmail,
  crUser,
  updateProfile,
  updatePassword,
  deleteUser,
};
