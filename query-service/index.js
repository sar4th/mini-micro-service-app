import express from "express";
import crypto from "crypto";
import axios from "axios";
const app = express();
const allPosts = [];
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to query service!");
});

app.get("/posts/all", (req, res) => {
  res.send(allPosts);
});
app.post("/events", (req, res) => {
  const event = req.body;
  const eventType = event.type;
  switch (eventType) {
    case "postCreated":
      allPosts.push(event.post);
  }
});
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
