import { createContext, useContext } from "react";
// src/firebase.js
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
    measurementId: "G-BM3PXT01HD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = async (email,password) => {
        try{
            const userCredential = await createUserWithEmailAndPassword(auth,email,password);
            return userCredential;
        }catch(error){
            console.log(error);
            throw error;
        }
    };

    const signinUserWithEmailAndPassword = async(email,password) => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            return userCredential;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }


    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword}}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

