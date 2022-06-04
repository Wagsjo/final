import express from "express";
const router = express.Router();
import { db } from "../firebase.js";
import { collection, doc, getDocs, getDoc } from "firebase/firestore/lite";

const hamsters = collection(db, "hamsters");

async function orderData() {
  let hamstersArr = [];
  const snapshot = await getDocs(hamsters);
  snapshot.forEach((doc) => {
    hamstersArr.push({ ...doc.data()});
  });
  console.log("hamstersArr");
  return hamstersArr;
}

router.get("/random", async (req, res) => {
  let hamstersArr = await orderData();
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

router.get("/", async (req, res) => {
  let hamstersArr = await orderData();
  res.send(hamstersArr);
});

export default router;
