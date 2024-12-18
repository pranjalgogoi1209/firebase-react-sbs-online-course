import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOvAAKMYUecDMadbPMWpifkZr58VtXpsU",
  authDomain: "learn-firebase-17e1c.firebaseapp.com",
  projectId: "learn-firebase-17e1c",
  storageBucket: "learn-firebase-17e1c.firebasestorage.app",
  messagingSenderId: "916550846952",
  appId: "1:916550846952:web:91af9de1ce8ef9c88abc5d",
  measurementId: "G-LZC6RH317W",
  databaseURL: "https://learn-firebase-17e1c-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export { app };
