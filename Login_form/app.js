
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBRlI0sIJA_6Q2CWfQh4P1V7rSxu3rBT8k",
    authDomain: "signup-5a84a.firebaseapp.com",
    databaseURL: "https://signup-5a84a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "signup-5a84a",
    storageBucket: "signup-5a84a.appspot.com",
    messagingSenderId: "1062770825281",
    appId: "1:1062770825281:web:047efd191adb54e7298ec0",
    measurementId: "G-QSTMQEQ0T2"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 


const db = getDatabase(app);
document.getElementById("submitbtn").addEventListener('click', (e) => {
    e.preventDefault();
  set(ref(db, 'user/' + document.getElementById("name-input").value), {

    username: document.getElementById("name-input").value,
    email: document.getElementById("email-input").value,
    password: document.getElementById("pass-input").value,
    confirmPass: document.getElementById("confirmpass").value

  });
    alert("Login Succesful");
})