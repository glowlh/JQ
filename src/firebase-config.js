import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-9SQcVwjSM8_r20bugFRVBOKlIvYSX08",
    authDomain: "japanquest-4afd5.firebaseapp.com",
    storageBucket: "japanquest-4afd5.appspot.com",
    databaseURL: "https://japanquest-4afd5-default-rtdb.europe-west1.firebasedatabase.app/"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);