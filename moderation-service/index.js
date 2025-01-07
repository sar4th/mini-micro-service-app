import express from "express";
import cors from "cors";
import axios from "axios";
const app = express();
const allComments = [];
app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Welcome to moderation service!");
});

app.post("/events", (req, res) => {
  const event = req.body;
  const eventType = event.type;
  switch (eventType) {
    case "postCreated":
      allPosts.push(event.post);
  }
});
const PORT = 4004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
