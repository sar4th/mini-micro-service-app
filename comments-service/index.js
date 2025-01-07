import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
const allComments = [];
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to comments service!");
});

app.get("/posts/all", (req, res) => {
  res.send(allPosts);
});
app.post("/comment/add", (req, res) => {
  debugger;
  try {
    const { comment } = req.body;
    allComments.push(comment);
    axios.post("http://localhost:4006/events", {
      type: "commentCreated",
      post: comment,
    });
  } catch (error) {
    console.log(error, "error");
  }
});
app.post("/events", (req, res) => {
  const event = req.body;
  const eventType = event.type;
  switch (eventType) {
    case "postCreated":
      allPosts.push(event.post);
  }
});
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
