// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {getStorage} from "@firebase/storage";
import {getFirestore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC8Lw8aeDtX6DMGHo7vy9NrinHDDZtDXW4",
    authDomain: "travelwithus-809bd.firebaseapp.com",
    projectId: "travelwithus-809bd",
    storageBucket: "travelwithus-809bd.firebasestorage.app",
    messagingSenderId: "663336730216",
    appId: "1:663336730216:web:fc2587ddaf8177b6e0c5dd",
    measurementId: "G-3B2KYWQB39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);
export const storage = getStorage(app);