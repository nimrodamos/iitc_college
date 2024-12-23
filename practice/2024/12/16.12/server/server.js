const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// חיבור ל-MongoDB
mongoose
  .connect("mongodb://localhost:27017/chat-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// סכמת הודעות
const messageSchema = new mongoose.Schema({
  room: { type: String, required: true },
  username: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const usersInRoom = {};

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", async ({ username, room }) => {
    socket.join(room);
    if (!usersInRoom[room]) usersInRoom[room] = [];
    usersInRoom[room].push({ id: socket.id, username });

    const recentMessages = await Message.find({ room })
      .sort({ timestamp: -1 })
      .limit(10);

    socket.emit("recentMessages", recentMessages.reverse());
    io.to(room).emit("roomUsers", usersInRoom[room]);
  });

  socket.on("sendMessage", async ({ room, username, message }) => {
    const newMessage = new Message({ room, username, message });
    await newMessage.save();

    io.to(room).emit("receiveMessage", { username, message });
  });

  socket.on("disconnect", () => {
    for (const room in usersInRoom) {
      usersInRoom[room] = usersInRoom[room].filter(
        (user) => user.id !== socket.id
      );
      io.to(room).emit("roomUsers", usersInRoom[room]);
    }
    console.log("A user disconnected");
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
