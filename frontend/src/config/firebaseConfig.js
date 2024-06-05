// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB4zQpNmuBk6aDf3LOfRubJbfCGKoEhCkY",
  authDomain: "diamond-shop-system.firebaseapp.com",
  projectId: "diamond-shop-system",
  storageBucket: "diamond-shop-system.appspot.com",
  messagingSenderId: "107644225653",
  appId: "1:107644225653:web:fb90b79a9608bf7e4a103c",
  measurementId: "G-WT0Y8PSXS0"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);