import express from "express";
const router = express.Router();
import { db } from "../firebase.js";
import { collection, doc, getDocs, getDoc } from "firebase/firestore/lite";

const hamsters = collection(db, "hamsters");
var hamstersArr = [];
orderData();

async function orderData() {
  const snapshot = await getDocs(hamsters);
  snapshot.forEach((doc) => {
    hamstersArr.push({ ...doc.data(), id: doc.id });
  });
  console.log("hamstersArr");
  return hamstersArr;
}

router.get("/random", (req, res) => {
  const integ = Math.floor(Math.random() * hamstersArr.length);
  res.send(hamstersArr[integ]);
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const docRef = doc(hamsters, id);
  getShit();
  async function getShit() {
    let snapshot = await getDoc(docRef);
    const data = await snapshot.data();
    if (snapshot.exists()) {
      try {
        return res.status(200).send(data);
      } catch (e) {
        console.log(e);
      }
    }
  }

  async function another() {
    let snapshot = await getDoc(docRef);
    const data = await snapshot.data();
    console.log(data);
    if (data === undefined) {
      console.log("nej nej nje");
      return res.sendStatus(404);
    }
  }
  another();
});

router.get("/", (req, res) => {
  res.send(hamstersArr);
});

export default router;
