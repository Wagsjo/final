import express from "express";
const app = express();
import cors from "cors";
import path from "path";
const __dirname = path.resolve(path.dirname(""));
const distPath = path.join(__dirname + "./../dist/");
import read from "./routes/read.js";
import post from "./routes/post.js";
import put from "./routes/put.js";
import dele from "./routes/delete.js";

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(distPath));
app.use('/img', express.static(path.join(__dirname, "./backend/hamsterImages/")));
console.log("dist:" + distPath);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, req.body);
  next();
});

app.get("/", (req, res) => {
  res.send("Hej");
});

app.use("/hamsters", read, post, put, dele);

app.get('*', (req, res) => {
  res.sendFile(distPath + 'index.html')
})

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log("app is running on", PORT);
});
