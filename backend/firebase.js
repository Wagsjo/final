// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// const firebaseConfig = {
//   apiKey: "AIzaSyDHl3rXDi9LcFFbstKZCaeaPubTic63Y08",
//   authDomain: "fullstack-f98ba.firebaseapp.com",
//   projectId: "fullstack-f98ba",
//   storageBucket: "fullstack-f98ba.appspot.com",
//   messagingSenderId: "627669035650",
//   appId: "1:627669035650:web:3289d3eb0977426710629b",
//   measurementId: "G-KF6V7EC0ZW",
// };
//dessa tre rader behövs för att vi har module i package.json och då kan man inte använda require på json filer.
import { createRequire } from "module";
const require = createRequire(import.meta.url);
let firebaseConfig;
if(process.env.PRIVATE_KEY) {
  firebaseConfig = JSON.parse(process.env.PRIVATE_KEY)
} else {
  firebaseConfig = require('./firebaseConfig.json')
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


export { db };
