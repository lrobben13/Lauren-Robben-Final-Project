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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

//Auth Status Change
onAuthStateChanged(auth, (user) => {
    if(user){
        console.log("User logged in: ", user.email);
        getRecipes(db).then((snapshot) => {
            setupRecipes(snapshot);
        });
        setupUI(user);
        const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    addDoc(collection(db, "recipes"), {
        title: form.title.value,
        description: form.description.value,
    }).catch((error) => console.log(error));
    form.title.value = "";
    form.description.value = "";
});
    }else {
        console.log("User logged out");
        setupUI();
        setupRecipes([]);
    }
});

//Signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

//Get User Information
    const email = signupForm["signup-email"].value;
    const password = signupForm["signup-password"].value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        //Signed In
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});

//Logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
    .then(() => {
        console.log("User has signed out");
    })
    .catch((error) => {

    });
});

//Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["login-email"].value;
    const password = loginForm["login-password"].value;
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const modal = document.querySelector("#modal-signup");
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
});
