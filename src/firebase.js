import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDqDll033OZQnBSuagZvVuky6vDVc-XIOQ",
  authDomain: "bookswap-f743c.firebaseapp.com",
  projectId: "bookswap-f743c",
  storageBucket: "bookswap-f743c.appspot.com",
  messagingSenderId: "381092959790",
  appId: "1:381092959790:web:04ee7d520c6d9294b8b1bf",
  measurementId: "G-DL82X0QKQ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
