//Authorization file
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signOut, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCVHLN6cATI4FYVevbidaEHR7uUwglP-Fw",
    authDomain: "fitness-application-89e5c.firebaseapp.com",
    databaseURL: "https://fitness-application-89e5c-default-rtdb.firebaseio.com",
    projectId: "fitness-application-89e5c",
    storageBucket: "fitness-application-89e5c.appspot.com",
    messagingSenderId: "469362847175",
    appId: "1:469362847175:web:bb659670ba5a355a127de2"
  };

  const app = initializeApp(firebaseConfig);

  