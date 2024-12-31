import { useState } from "react";
import "./App.css";
import axios from "axios";
function App() {
  const [title, setTitle] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    axios.post("http://localhost:4001/post/create", { title: title });
  };

  return (
    <>
      <h1>Blog App</h1>

      <div
        style={{
          marginTop: "20px",
        }}
      >
        <h2>Create Post </h2>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your name:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default App;
