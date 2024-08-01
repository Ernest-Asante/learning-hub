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
  /* apiKey: "AIzaSyDx5l1Y_zxFhpPXZW-GkpOSUeTIoCCL2Nc",
    authDomain: "waecbay.firebaseapp.com",  
    projectId: "waecbay",
    storageBucket: "waecbay.appspot.com",
    messagingSenderId: "311653883444",
    appId: "1:311653883444:web:81ec195195c09505cab461",
    measurementId: "G-4C3LL04W8H" */
   

     /* apiKey: "AIzaSyCiOxHtH7dY7e8mGRTnZlAWBjrU00_J900", 
      authDomain: "egc-virtualclassroom.firebaseapp.com", 
      projectId: "egc-virtualclassroom",
      storageBucket: "egc-virtualclassroom.appspot.com",
      messagingSenderId: "30249766821",
      appId: "1:30249766821:web:8c7f8a950f21d4641be24c", 
      measurementId: "G-TJ4H380G6L"  */


      apiKey: "AIzaSyANk4tOk7yr0WYu9_513D3Nf3LW3qJQUYo",
      authDomain: "mylearning-hub.firebaseapp.com",
      projectId: "mylearning-hub",
      storageBucket: "mylearning-hub.appspot.com",
      messagingSenderId: "264915107592",
      appId: "1:264915107592:web:ecb202cc28452dc4beb6bd",
      measurementId: "G-H2EVSSSPQ8"
    
  }; 
 
// Initialize Firebase
const app = initializeApp(firebaseConfig); 
 export const storage = getStorage(app);
 export const db = getFirestore(app); 
 export const analytics = getAnalytics(app); 
export const auth = getAuth(app);



