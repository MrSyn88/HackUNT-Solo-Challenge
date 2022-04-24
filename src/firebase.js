// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8qk6W9fqT30UrbCqAHuBHzGDbpnCKCJo",
    authDomain: "hackunt-solo-challenge.firebaseapp.com",
    projectId: "hackunt-solo-challenge",
    storageBucket: "hackunt-solo-challenge.appspot.com",
    messagingSenderId: "561542156717",
    appId: "1:561542156717:web:91251ccc50bc8d74a6d124",
    measurementId: "G-QVTVYHZGH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);