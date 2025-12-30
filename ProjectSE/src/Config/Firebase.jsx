
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore}  from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCzqCz7acx291b7FM2Y-fuujaoy-g3tZPM",
  authDomain: "digital-52b5d.firebaseapp.com",
  projectId: "digital-52b5d",
  storageBucket: "digital-52b5d.appspot.com",
  messagingSenderId: "987971391833",
  appId: "1:987971391833:web:b7ac3d7303c7a09fe73c48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { app, auth,db, storage};