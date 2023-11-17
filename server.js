// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);

// const cors = require("cors");
// app.use(cors());

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update with your React app's origin
    methods: ["GET", "POST"],
    credentials: true,
    optionsSuccessStatus: 204,
  },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, welcome to the chat app!");
});

// server.js
// ... (existing code)

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    socket.broadcast.emit("chat message", msg); // Broadcast to all sockets except the sender
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ... (existing code)

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
