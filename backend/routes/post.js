import express from "express";
const router = express.Router();
import { db } from "../firebase.js";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
} from "firebase/firestore/lite";

const hamsters = collection(db, "hamsters");

// 2 klar
router.post("/", (req, res) => {
  const bodyy = req.body;
  asd();
  async function asd() {
    const docRef = await addDoc(collection(db, "hamsters"), bodyy);
    const readDoc = await getDoc(docRef);
    const idd = { id: readDoc.id };
    await setDoc(docRef, idd, { merge: true });
    const lastTime = await getDoc(docRef);
    const output = lastTime.data();
    return res.status(200).send(output);
  }
});

export default router;
