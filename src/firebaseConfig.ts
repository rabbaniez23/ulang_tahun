// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import getStorage

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBN4DEKlHbtL_frs1Bs0njCbUe0nphlBsg",
  authDomain: "birthdayaghniapp.firebaseapp.com",
  projectId: "birthdayaghniapp",
  storageBucket: "birthdayaghniapp.firebasestorage.app",
  messagingSenderId: "536311721167",
  appId: "1:536311721167:web:53cc5e36c93f23db96dbba",
  measurementId: "G-254CDMYN9L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Export the storage instance
