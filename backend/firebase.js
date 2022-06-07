// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore/lite"
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
