import express from "express";
import crypto from "crypto";
import axios from "axios";
const app = express();
const allPosts = [];
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to post-service!");
});

app.post("/post/create", (req, res) => {
  const id = crypto.randomUUID();
  const { title } = req.body;
  let post = {
    id: id,
    title: postBody,
  };
  allPosts.push(post);
  res.send(allPosts);
  axios.post("http://localhost:4005/events", {
    type: "postCreated",
    post: post,
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
