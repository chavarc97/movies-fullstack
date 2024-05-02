// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "movies-c0afa.firebaseapp.com",
  projectId: "movies-c0afa",
  storageBucket: "movies-c0afa.appspot.com",
  messagingSenderId: "504220561151",
  appId: "1:504220561151:web:b1058f3ab6cf45ec65a6ca"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);