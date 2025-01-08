import express from "express";
import cors from "cors";
const app = express();
const allPosts = [];
app.use(express.json());
app.use(cors());
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
      break;
    case "commentCreated":
      let comment = event.comment;
      let commentID = event.comment.id;
      let post = allPosts.find((post) => post?.id == commentID);
      if (post?.comment?.length > 0) {
        post.comment.push(comment);
      } else {
        post.comment = [];
        post.comment.push(comment);
      }
      res.json({
        message: "comment added successfully",
      });
      break;
  }
});
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
