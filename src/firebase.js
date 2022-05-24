// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmlfxRI2LHYRRjfNokDPiA0kFX7_shXMY",
  authDomain: "kodeschool-ee970.firebaseapp.com",
  projectId: "kodeschool-ee970",
  storageBucket: "kodeschool-ee970.appspot.com",
  messagingSenderId: "1011193406296",
  appId: "1:1011193406296:web:c0cc53a6d5cd9c0b4fbb2d",
};

// Initialize Firebase

export const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
