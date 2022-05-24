import { db } from './firebase.js'

import { collection, getDoc, getDocs, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore/lite"

//referens till kollektionerna.
const animalRef = collection(db, "animals");
const plantRef = collection(db, "plants")

//referens till dokumenten inuti kollektionerna
const docPlant = doc(plantRef, "f39u9Pl6hRKu2yCCnd1E");
const docAnimal = doc(animalRef);

//för att se innehållet i en kollektion
let animals = [];
getDocs(animalRef).then((snapshot) => {
  snapshot.forEach((doc) => {
    animals.push({ ...doc.data(), id: doc.id });
  });
  console.log(animals);
});

let asd = doc(animalRef, "r7kzPeF1EKeip2uOHYyx")

//lägga till nya djur
let newObj = {
  name: "asd",
  eats: "adsads"
}
updateDoc(asd, newObj)

//delete djur
/* deleteDoc(docPlant) */

// const snapshot = await getDoc(docPlant)
// const data = snapshot.data()
// const animalRef = db.collection('animals')
