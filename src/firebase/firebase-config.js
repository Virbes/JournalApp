import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyASaNRKnJdGDtM-NGOyWe-pYZtdXOpuLMo",
    authDomain: "react-app-curso-d17c8.firebaseapp.com",
    projectId: "react-app-curso-d17c8",
    storageBucket: "react-app-curso-d17c8.appspot.com",
    messagingSenderId: "452640657130",
    appId: "1:452640657130:web:f2555fecb22000fe525193"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleAuthProvider = new GoogleAuthProvider();
export const popupGoogle = signInWithPopup;
export const createUser = createUserWithEmailAndPassword;
export const updateUser = updateProfile; 