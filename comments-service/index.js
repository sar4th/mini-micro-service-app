import http from "http";

// Creating server
const server = http.createServer((req, res) => {
  // Sending the response
  res.write("This is the response from the server");
  res.end();
});

// Server listening to port 3000
server.listen(4000, () => {
  console.log("Comments service is running on port 4000");
});
