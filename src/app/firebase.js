// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDaclJXQs-XXO31SzZedxg7_DwnE18Ng6E",
    authDomain: "minimal-manualidades-app.firebaseapp.com",
    projectId: "minimal-manualidades-app",
    storageBucket: "minimal-manualidades-app.appspot.com",
    messagingSenderId: "980262696650",
    appId: "1:980262696650:web:aff24a9051a72d56236633",
    measurementId: "G-TF961EEVNV"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
