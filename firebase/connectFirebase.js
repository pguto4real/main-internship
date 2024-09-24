// Import the functions you need from the SDKs you need

import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuZb76DMY_UBUUXSjzRtGz54QM9-EzcyQ",
  authDomain: "advanced-internship-216b3.firebaseapp.com",
  projectId: "advanced-internship-216b3",
  storageBucket: "advanced-internship-216b3.appspot.com",
  messagingSenderId: "401365820108",
  appId: "1:401365820108:web:5cfd041e305b0d859cd869"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const firebaseAuth = getAuth();
// export const db = getFirestore()

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const firebaseAuth = getAuth();
const db = getFirestore();

export { firebaseAuth, db };
export default app;