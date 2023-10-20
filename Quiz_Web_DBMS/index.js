//LOGIN - POPUP
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');



registerLink.addEventListener('click', () => {
    wrapper.classList.add("active");
})

loginLink.addEventListener('click', () => {
    wrapper.classList.remove("active");
})

btnPopup.addEventListener('click', () => {
    wrapper.classList.add("active-popup");
})

iconClose.addEventListener('click', () => {
    wrapper.classList.remove("active-popup");
})
//:LOGIN POPUP



//FIREBASE AUTHENTICATION 

var firebaseConfig = {
    apiKey: "AIzaSyADLIRlTPdN1Gb5uCMx38j_LdEeItJTuNI",
    authDomain: "login-with-firebase-data-2e7cc.firebaseapp.com",
    projectId: "login-with-firebase-data-2e7cc",
    storageBucket: "login-with-firebase-data-2e7cc.appspot.com",
    messagingSenderId: "818228207785",
    appId: "1:818228207785:web:a695a516f4c4f4499f89b8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  var googleProvider = firebase.auth.GoogleAuthProvider();

  // Set up our register function 
  function register() {
    // Get all our input fields
    email = document.getElementById('r_email').value
    password = document.getElementById('r_password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return 
      // Don't continue running the code
    }
    
    
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email, 
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!!')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }

  // Set up our login function
  function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false || validate_password(password) == false) {
      alert('Email or Password is Outta Line!!')
      return 
      // Don't continue running the code
    }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }


  

//FIREBASE GOOGLE AUTH
// const signInwithGoogleButton = document.getElementById('signInwithGoogle');





function signInWithGooglePopup() {
  // Create an instance of the Google provider for sign-in
  const provider = new firebase.auth.GoogleAuthProvider();

  // Sign in with a Google popup
  auth
    .signInWithPopup(provider)
    .then((result) => {
      // This function is called when the user successfully signs in
      const user = result.user;
      console.log(`Signed in as ${user.displayName}`);
      // You can redirect to another page or perform other actions here
    })
    .catch((error) => {
      // Handle errors here
      console.error(`Error signing in: ${error.message}`);
    });
}

//  Call signInWithPopup when a button is clicked
const signInButton = document.getElementById('signInwithGoogle');

signInButton.addEventListener('click', () => {
  signInWithGooglePopup();
});

// const signInwithGoogle = () =>{

// }

// signInwithGoogleButton.addEventlistener('click',signInwithGoogle);


//: FIREBASE GOOGLE AUTH