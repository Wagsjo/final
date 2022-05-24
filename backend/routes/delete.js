import express from "express";
const router = express.Router();
import { db } from "../firebase.js";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  getDoc,
} from "firebase/firestore/lite";
const hamsters = collection(db, "hamsters");
const docHamster = doc(hamsters);
const deleted = collection(db, "deleted");

/* orderData();
async function orderData() {
  const snapshot = await getDocs(hamsters);
  snapshot.forEach((doc) => {
    hamstersArr.push({ ...doc.data(), id: doc.id });
  });
  return hamstersArr;
} */
// async function orderDeleted() {
//   const snap = await getDocs(deleted);
//   snap.forEach((doc) => {
//     deletedArr.push({ ...doc.data(), id: doc.id });
//   });
//   return deletedArr
// }
// //kan använda req.body istället för params om man vill

router.delete("/:id", (req, res) => {
  deleteShit();
  // orderData();
  // let toBeDeleted = req.params.id;
  // let docRef = doc(hamsters, toBeDeleted);
  // //denna if sats filtrerar ut alla hamstrar som matchar med params och verifierar därmed om requestet är godkänt.
  // if (hamstersArr.filter((hamster) => hamster.id === toBeDeleted).length > 0) {
  //   // deleteDoc(docRef)
  //   return res.sendStatus(200)
  // }
  // return res.sendStatus(404);
  async function deleteShit() {
    const id = req.params.id;
    const docRef = doc(hamsters, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      await deleteDoc(docRef);
      console.log("did work");
      return res.sendStatus(200);
    }
    console.log("did not work");
    return res.sendStatus(404);
  }
});

export default router;
