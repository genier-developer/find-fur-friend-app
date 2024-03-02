// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from "firebase/database"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAVxBJijswcwsg4DNsGtr53hdH07uAcxtA",
    authDomain: "pet-shelter-fa4be.firebaseapp.com",
    databaseURL: "https://pet-shelter-fa4be-default-rtdb.firebaseio.com",
    projectId: "pet-shelter-fa4be",
    storageBucket: "pet-shelter-fa4be.appspot.com",
    messagingSenderId: "531819954511",
    appId: "1:531819954511:web:c1805dddcc60457c3f853a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase()
const auth = getAuth()

export { app, db, auth }