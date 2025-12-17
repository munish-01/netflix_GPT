// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPR0evpIBCATua5JRaczZKVd98iIJVLjw",
  authDomain: "netflixgpt-cfea3.firebaseapp.com",
  projectId: "netflixgpt-cfea3",
  storageBucket: "netflixgpt-cfea3.firebasestorage.app",
  messagingSenderId: "603432256814",
  appId: "1:603432256814:web:0317b8507cd8264fe966bf",
  measurementId: "G-8RTT1208PJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth()