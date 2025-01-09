import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [title, setTitle] = useState<string>("");
  const [allPosts, setAllPosts] = useState<unknown[]>([]);
  const [reFetch, setRefetch] = useState<boolean>(false);
  const [comment, setComment] = useState();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/post/create", {
        title,
      });
      setTitle("");
      if (response?.data) {
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4002/posts/all");
        setAllPosts(response?.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [reFetch]);
  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:4000/comment/${comment.id}/add`,
        {
          comment,
        }
      );
      setTitle("");
      if (response?.data) {
        setRefetch((prev) => !prev);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.mainHeading}>Blog App</h1>
      </header>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Create a New Post</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={styles.input}
              placeholder="Enter post title"
            />
          </label>

          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>All Posts</h2>
        {allPosts && allPosts.length > 0 ? (
          <ul style={styles.postList}>
            {allPosts?.map((post, index) => (
              <li key={index} style={styles.postItem}>
                <h3>{post.title}</h3>
                {/* Render comments */}
                {post?.comment?.map((comment, commentIndex) => (
                  <p key={commentIndex} style={{ color: "red" }}>
                    {comment.comment.comment}
                  </p>
                ))}
                {/* Form to add a new comment */}
                <form
                  onSubmit={(e) => handleAddComment(e, post.id)}
                  style={styles.form}
                >
                  <label style={styles.label}>
                    <input
                      type="text"
                      value={comment?.comment}
                      onChange={(e) =>
                        setComment({ id: post?.id, comment: e.target.value })
                      }
                      style={styles.input}
                      placeholder="Enter comment"
                    />
                  </label>
                  <button type="submit" style={styles.button}>
                    Submit
                  </button>
                </form>
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noPosts}>No posts available.</p>
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    color: "#333",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  mainHeading: {
    color: "#2c3e50",
    fontSize: "2rem",
    margin: 0,
  },
  section: {
    marginBottom: "30px",
  },
  subHeading: {
    fontSize: "1.2rem",
    color: "#34495e",
    marginBottom: "15px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "1rem",
    color: "#34495e",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontSize: "1rem",
  },
  button: {
    padding: "12px 0",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    textAlign: "center",
  },
  postList: {
    listStyleType: "none",
    padding: 0,
  },
  postItem: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "#ecf0f1",
    fontSize: "1rem",
    textAlign: "left",
  },
  noPosts: {
    fontSize: "1rem",
    color: "#7f8c8d",
    textAlign: "center",
  },
};

export default App;
