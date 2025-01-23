// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbtYe1ercev22UKrJs-rLFhU1Gz4BLUoQ",
  authDomain: "snapshawt-test-ssr.firebaseapp.com",
  databaseURL: "https://snapshawt-test-ssr-default-rtdb.firebaseio.com",
  projectId: "snapshawt-test-ssr",
  storageBucket: "snapshawt-test-ssr.firebasestorage.app",
  messagingSenderId: "444475158386",
  appId: "1:444475158386:web:17574243c37db563b937eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

export default app;
