// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyBO-sUSWcXURO5OJldvSQEByjUAYexPEfY",
//     authDomain: "shopping-cart-vue3.firebaseapp.com",
//     projectId: "shopping-cart-vue3",
//     storageBucket: "shopping-cart-vue3.appspot.com",
//     messagingSenderId: "90874492172",
//     appId: "1:90874492172:web:af79be1f7d2d63772f4529",
//     measurementId: "G-0SSNEXNC7T",
//     databaseURL: " https://shopping-cart-vue3-default-rtdb.asia-southeast1.firebasedatabase.app"

// };
const firebaseConfig = {
    apiKey: "AIzaSyB6assGejX3h7ISFz7exKdT5o3GiXeTp6Y",
    authDomain: "shoppe-food-1ef30.firebaseapp.com",
    projectId: "shoppe-food-1ef30",
    storageBucket: "shoppe-food-1ef30.appspot.com",
    messagingSenderId: "821729802378",
    appId: "1:821729802378:web:d2b71938e70638dac3d573",
    measurementId: "G-8PZJDKT4QX"
};
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;