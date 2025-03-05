import express from "express";
import crypto from "crypto";
import axios from "axios";
import cors from "cors";
const app = express();
const allPosts = [];
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to post-service!");
});

app.post("/post/create", (req, res) => {
  const id = crypto.randomUUID();
  const { title } = req.body;
  let post = {
    id: id,
    title: title,
  };
  allPosts.push(post);
  res.send(allPosts);
  axios.post("http://event-bus-clusterip-srv:4006/events", {
    type: "postCreated",
    post: post,
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
