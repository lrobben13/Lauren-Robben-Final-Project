import { initializeApp } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  enableIndexedDbPersistence
} from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";


// Your web app's Firebase configuration
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
const db = getFirestore(app);
const auth = getAuth(app);

async function getRecipes(db) {
    const recipesCol = collection(db, "recipes");
    const recipeSnapshot = await getDocs(recipesCol);
    const recipeList = recipeSnapshot.docs.map((doc) => doc);
    return recipeList;
}


enableIndexedDbPersistence(db)
  .catch((err) => {
      if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
      console.log("Persistance Failed");
      } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          console.log("Persistance is not valid");
      }
  });


const unsub = onSnapshot(collection(db, "recipes"), (doc) => {
  //   console.log(doc.docChanges());
  doc.docChanges().forEach((change) => {
    // console.log(change, change.doc.data(), change.doc.id);
    if (change.type === "added") {
      //Call render function in UI
      renderRecipe(change.doc.data(), change.doc.id);
    }
    if (change.type === "removed") {
        removeRecipe(change.doc.id)
    }
  });
});

 //add a new recipe
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

//delete recipe
const recipeContainer = document.querySelector(".recipes");
recipeContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const id = event.target.getAttribute("data-id");
    deleteDoc(doc(db, "recipes", id));
  }
});

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

