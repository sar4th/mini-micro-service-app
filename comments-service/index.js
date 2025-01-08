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
app.post("/comment/:id/add", async (req, res) => {
  try {
    const { comment } = req.body; // Extract comment from the request body
    const postID = req.params.id; // Get post ID from the request parameters

    // Find if there are existing comments for the post
    let wholeComments = allComments.find((entry) => entry?.id == postID);

    if (!wholeComments) {
      // If no entry exists, create a new one
      wholeComments = { id: postID, comments: [] };
      allComments.push(wholeComments);
    }

    // Add the new comment to the post's comments
    wholeComments.comments.push(comment);

    // Notify event service
    await axios.post("http://localhost:4006/events", {
      type: "commentCreated",
      comment: {
        id: postID,
        comment: comment,
      },
    });

    // Send a success response
    res.json({
      message: "Comment added successfully",
    });
  } catch (error) {
    console.error("Error adding comment:", error);

    // Send an error response
    res.status(500).json({
      message: "An error occurred while adding the comment",
      error: error.message,
    });
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
