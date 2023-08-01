// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

export const createAuthUserWithEmailAndPassword = async(email, password) => {
  if(!email|| !password ) return;
  try{
    const newUser = await createUserWithEmailAndPassword(auth, email, password);
    return newUser;
  } catch(err) {
    console.log(err);
    throw err;
  }
}