import express from "express";
const router = express.Router();
import { db } from "../firebase.js";
import { collection, doc, setDoc, getDoc } from "firebase/firestore/lite";

const hamsters = collection(db, "hamsters");

router.put("/:id", (req, res) => {
  let id = req.params.id;
  const docRef = doc(hamsters, id);
  let newData = req.body;
  const lastData = {};
  for (let i in newData) {
    if (newData[i] != undefined) {
      lastData[i] = newData[i];
    }
  }

  //kollar så alla värden kommer in i req.body
  const completeData = Object.values(newData).length === 0;
  if (completeData) {
    return res.sendStatus(400);
  }

  checkData();
  async function checkData() {
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      try {
        setDoc(docRef, lastData, { merge: true });
        res.sendStatus(200);
        return;
      } catch (e) {
        console.log(e);
      }
    } else {
      return res.sendStatus(404);
    }
  }
});

export default router;
