import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_WTRk67iZkOep-8g-fWbeGVPkaQSZiH4",
  authDomain: "e-shopp-35835.firebaseapp.com",
  projectId: "e-shopp-35835",
  storageBucket: "e-shopp-35835.firebasestorage.app",
  messagingSenderId: "9751480756",
  appId: "1:9751480756:web:13b2cb26bc110b1c360ae1",
};

// Inicializa
const app = initializeApp(firebaseConfig);

// 🔐 Auth (isso que a gente quer)
export const auth = getAuth(app);