// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import  {getStorage} from "firebase/storage";
import {getFirestore} from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  /*USE YOUR OWN FIREBASE CONFIG HERE */
   



     
    
  }; 
 
// Initialize Firebase
const app = initializeApp(firebaseConfig); 
 export const storage = getStorage(app);
 export const db = getFirestore(app); 
 export const analytics = getAnalytics(app); 
export const auth = getAuth(app);



