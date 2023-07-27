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
  
// Function to handle sign-up
function signUp(event) {
    event.preventDefault();
  
    var email = document.getElementById("signUpEmail").value;
    var password = document.getElementById("newPassword").value;
  
    // Use Firebase SDK to create a new user account
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-up successful, do something (e.g., show a success message)
        var user = userCredential.user;
        console.log("Sign-up successful:", user);
      })
      .catch((error) => {
        // Handle sign-up errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Sign-up error:", errorMessage);
      });
  }
 
  
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });
 
  // Function to handle sign-in
  function signIn(event) {
    event.preventDefault();
  
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Use Firebase SDK to sign in
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful, do something (e.g., redirect to another page)
        var user = userCredential.user;
        console.log("Sign-in successful:", user);
      })
      .catch((error) => {
        // Handle sign-in errors
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error("Sign-in error:", errorMessage);
      });
  }

  
  
  
  
  
  
  
  
  
  
  
  
  