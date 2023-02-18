import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
const {
  REACT_APP_FIREBASE_APIKEY,
  REACT_APP_FIREBASE_AUTHDOMAIN,
  REACT_APP_FIREBASE_PROJECT_ID,
  REACT_APP_FIREBASE_STORAGE_BUCKET,
  REACT_APP_FIREBASE_MESSAGING_SENDERID,
  REACT_APP_FIREBASE_APPID
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_APIKEY,
  authDomain: REACT_APP_FIREBASE_AUTHDOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDERID,
  appId: REACT_APP_FIREBASE_APPID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)