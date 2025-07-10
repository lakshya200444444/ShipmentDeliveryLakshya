// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMlkLH3-wm98h6yghbmldpHSHzr7sLWLs",
  authDomain: "shipment-delivery-lakshya.firebaseapp.com",
  projectId: "shipment-delivery-lakshya",
  storageBucket: "shipment-delivery-lakshya.appspot.com",   // <-- fixed typo here ("app" → "appspot.com")
  messagingSenderId: "745698502300",
  appId: "1:745698502300:web:f3257f4f355a395a6f2f59",
  measurementId: "G-V3WHX6THTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export so you can use in other files
export { app, analytics };
