// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxu8eURvql-83ZHPHePkBDqKhNP87M-Vc",
  authDomain: "pointify-fe.firebaseapp.com",
  projectId: "pointify-fe",
  storageBucket: "pointify-fe.appspot.com",
  messagingSenderId: "417917037112",
  appId: "1:417917037112:web:68dad888dd99c7258f94cd",
  measurementId: "G-4ENDCZMHEJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);