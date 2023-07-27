// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDZm2OmMkMGM3Qj1fmB5c047OHVDvaYcg8",
    authDomain: "recipe-401d1.firebaseapp.com",
    projectId: "recipe-401d1",
    storageBucket: "recipe-401d1.appspot.com",
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
      })
      .catch((error) => {
        // Handle sign-in errors
        console.error("Sign-in error:", error);
      });
  }
  
  // Function to handle sign-up
  function signUp(event) {
    event.preventDefault();
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("newPassword").value;
  
    // Use Firebase SDK to create a new user account
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-up successful, do something (e.g., show a success message)
        console.log("Sign-up successful:", userCredential.user);
      })
      .catch((error) => {
        // Handle sign-up errors
        console.error("Sign-up error:", error);
      });
  }
  
  
  
  
  
  