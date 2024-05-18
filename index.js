const express = require("express");
const app = express();
const cors = require("cors")
const port = 8000;
const fs = require("fs")
const courseData = require("./CardData.json")
const reviewData = require("./ReviewCard.json")

app.use(express.json())

app.use(
  cors({
    origin: ["http://localhost:3000","http://localhost:8000","https://frondcadd.onrender.com"],
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);


app.post("/review", (req, res) => {
  let {img, name, coursename, review } = req.body;
  if (!img ||!name || !coursename || !review) {
    res.status(400).send({ message: "All fields Required" });
  }
  let id = Date.now();
  reviewData.push({id,img, name, coursename, review });
  fs.writeFile(
    "./ReviewCard.json",
    JSON.stringify(reviewData),
    (err, data) => {
      return res.json({ message: "User Details ADD" });
    }
  );
});

app.delete("/review/:id",(req,res)=>{
  let id = Number(req.params.id);
  let filter = reviewData.filter((user)=>user.id !== id);
  fs.writeFile(
    "./ReviewCard.json",
    JSON.stringify(filter),
    (err, data) => {
      return res.json(filter);
    }
  );
  console.log("Deleted");
})
app.patch("/review/:id", (req, res) => {
  let id = Number(req.params.id);
let { img,name, coursename, review } = req.body;
if (!img ||!name || !coursename || !review) {
  res.status(400).send({ message: "All fields Required" });
}
let index =reviewData.findIndex((user)=> user.id == id);
reviewData.splice(index,1,{...req.body})
  fs.writeFile(
    "./ReviewCard.json",
    JSON.stringify(reviewData),
    (err, data) => {
      return res.json({ message: "User Details Updated" });

    }
  );
});


app.get("/course",(req,res)=>{
    return res.json(courseData);
})

app.get("/review", (req, res) => {
  return res.json(reviewData);
});

app.listen(port,(err)=>{
    console.log(`app is running in ${port}`);
})
