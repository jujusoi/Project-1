// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCuyWlBhHU1wn9Cb34O_aCu6D_JAlRpJzs",
    authDomain: "reciperadar-da06b.firebaseapp.com",
    projectId: "reciperadar-da06b",
    storageBucket: "reciperadar-da06b.appspot.com",
    messagingSenderId: "444657458102",
    appId: "1:444657458102:web:36c2599930882805eabf17",
    measurementId: "G-LBZ1MVS322"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get the auth object
  const auth = firebase.auth();
  
// Function to handle sign-in
function signIn(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Use Firebase SDK to sign in
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful, do something (e.g., redirect to another page)
        console.log("Sign-in successful:", userCredential.user);
        window.location.replace("./index.html");
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Sign-in error:", error);
        const errorMessage = error.message;
        document.getElementById("signInError").innerText = errorMessage;
        document.getElementById("signInError").classList.add("visible");
      });
  }
  
  // Function to handle sign-up
  function signUp(event) {
    event.preventDefault();
  
    const email = document.getElementById("newEmail").value;
    const password = document.getElementById("newPassword").value;
  
    // Use Firebase SDK to create a new user account
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-up successful, do something (e.g., show a success message)
        console.log("Sign-up successful:", userCredential.user);
        window.location.replace("./index.html");
      })
      .catch((error) => {
        // Handle sign-up errors
        console.error("Sign-up error:", error);
        const errorMessage = error.message;
        document.getElementById("signUpError").innerText = errorMessage;
        document.getElementById("signUpError").classList.add("visible");
      });
  }
  
  
  
  
  
  
  