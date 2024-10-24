import { createContext, useContext,useEffect,useState } from "react";
// src/firebase.js
import { initializeApp } from "firebase/app";
import {    createUserWithEmailAndPassword,
            getAuth,
            signInWithEmailAndPassword,
            GoogleAuthProvider,
            onAuthStateChanged,
            signInWithPopup,
            signOut,
        } from "firebase/auth";



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

const googleProvider = new GoogleAuthProvider();



export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        onAuthStateChanged(auth, user =>{
            if(user){
                //user is logged in
                console.log('hello',user.displayName);
                setUser(user);
            } else{
                //user is logged out
                console.log("you are logged out")
                setUser(null);
            }
            setIsAuthReady(true)
        });
    
    },[])

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

    const signupWithGoogle = async () => {
        try{
            const userCredential = await signInWithPopup(auth,googleProvider);
            return userCredential;
        }catch(error){
            console.error(error);
            throw error;
        }
    }

    const signOutUser = async () => {
        try{
            return signOut(auth);
        } catch(error){
            console.log(error)
            throw error;
        }
    }
    


    return(
        <FirebaseContext.Provider value={{signupUserWithEmailAndPassword, signinUserWithEmailAndPassword, signupWithGoogle, user, signOutUser,isAuthReady}}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

