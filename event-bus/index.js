import express from "express";
import axios from "axios";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to event-bus-service!");
});

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4001/events", event);
});

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
