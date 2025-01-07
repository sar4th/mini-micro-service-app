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
      // Optional chaining is used to safely access event?.post.id
      if (event?.post?.id) {
        const post = allPosts.find((post) => post.id === event.post.id);
        let comment = event.post.comment;
        if (post) {
          // If the post is found, add the comment
          Object.assign(post, { comment });
        } else {
          console.log("Post not found for the provided ID");
        }
      } else {
        console.log("Invalid event or post structure", event);
      }

      console.log("this is for testing ", event?.post?.id, allPosts);
      break;
  }
});
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
