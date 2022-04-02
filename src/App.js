import logo from './logo.svg';
import './App.css';
import { initializeApp } from "firebase/app";
import { getStorage, uploadString, ref, getDownloadURL} from "firebase/storage";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, getAdditionalUserInfo } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

var getdata;
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

function App() {
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
        
        <form>
          <div id="yo"></div>
          <input type='tel'></input>
          <input type='submit' id='sign-in-button' value='submitme'></input>
        </form>
      </header>
    </div>
  );
}

export default App;
