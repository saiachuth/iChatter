const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const server = http.createServer(app);
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const path = require("path");

dotenv.config(); // Load environment variables first

connectDB(); // Then connect to MongoDB

const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
    optionsSuccessStatus: 204,
  },
});

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, welcome to the chat app!");
});

// -----Deployment____________

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/ichat/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "ichat", "build", "index.html"));
  }); // <-- Missing closing parenthesis here
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully");
  });
}

// -----Deployment____________

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    socket.broadcast.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} ...`.yellow.bold);
});
