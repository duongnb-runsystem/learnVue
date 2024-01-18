// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBO-sUSWcXURO5OJldvSQEByjUAYexPEfY",
    authDomain: "shopping-cart-vue3.firebaseapp.com",
    projectId: "shopping-cart-vue3",
    storageBucket: "shopping-cart-vue3.appspot.com",
    messagingSenderId: "90874492172",
    appId: "1:90874492172:web:af79be1f7d2d63772f4529",
    measurementId: "G-0SSNEXNC7T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;