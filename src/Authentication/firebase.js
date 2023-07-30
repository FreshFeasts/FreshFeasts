// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6R-8Oh7tsp3_dsCbkbXoCJ6-g639pT8M",
  authDomain: "freshfeasts-7eb96.firebaseapp.com",
  projectId: "freshfeasts-7eb96",
  storageBucket: "freshfeasts-7eb96.appspot.com",
  messagingSenderId: "908320274638",
  appId: "1:908320274638:web:bfef3b4ffb774c455f789f",
  measurementId: "G-M3LF2MNG5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);