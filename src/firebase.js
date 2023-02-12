import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCaV_grwptkhZeEUFE2K8waRWUG6eMp8Zg",
  authDomain: "portfolio-c325b.firebaseapp.com",
  projectId: "portfolio-c325b",
  storageBucket: "portfolio-c325b.appspot.com",
  messagingSenderId: "343390328221",
  appId: "1:343390328221:web:8e3c0147f59d6183f08b74"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)