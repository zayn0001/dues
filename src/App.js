import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getStorage, uploadString, ref, getDownloadURL} from "firebase/storage";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, getAdditionalUserInfo, signInWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import React from 'react';



class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          
          <form id='form'>
            <div id="yo"></div>
            <input type='tel'></input>
            <input type='submit' id='sign-in-button' value='submitme'></input>
          </form>
        </header>
      </div>
    );
  }
  componentDidMount() {
    const firebaseConfig = {
      apiKey: "AIzaSyDSK1LXKkYKgs1vkOvVLlzUHf6u3jgYQCI",
      authDomain: "dues-35631.firebaseapp.com",
      projectId: "dues-35631",
      storageBucket: "dues-35631.appspot.com",
      messagingSenderId: "94288131228",
      appId: "1:94288131228:web:a7c73957403ad98fce2959",
      measurementId: "G-B1GWR93MM8"
    };
    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    const storageRef = ref(storage, 'mydata.txt');
    
    var data = "secretstuff"
    uploadString(storageRef, data).then((snapshot) => (
      console.log("success")
    ))
    
    getDownloadURL(storageRef).then((url) => {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'text';
      xhr.onload = (event) => {
        const blob = xhr.response;
        console.log(blob)
        document.getElementById("yo").innerHTML = blob
      };
      xhr.open('GET', url);
      xhr.send();
    })
    
    const analytics = getAnalytics(app);
    console.log(analytics)
    
    document.getElementById("form").onsubmit = (e) => {
      e.preventDefault()
      console.log("submit")
    }
    function onSignInSubmit() {}
    
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        console.log("recapt")
        onSignInSubmit();
      }
    }, auth);

    // const phoneNumber = '+918129953715';
    // const appVerifier = window.recaptchaVerifier;
    // signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    // .then((confirmationResult) => {
    //   // SMS sent. Prompt user to type the code from the message, then sign the
    //   // user in with confirmationResult.confirm(code).
    //   window.confirmationResult = confirmationResult;
      //     const code = getCodeFromUserInput();
      // confirmationResult.confirm(code).then((result) => {
      //   // User signed in successfully.
      //   const user = result.user;
      //   // ...
      // }).catch((error) => {
      //   // User couldn't sign in (bad verification code?)
      //   // ...
      // });
      
    //   // ...
    // }).catch((error) => {
    //   // Error; SMS not sent
    //   console.log(error)
    //   // ...
    // });

    const email = 'mishal0404@gmail.com'
    const password = '12345678'
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log("wahooooo")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
  }
}

export default App;
