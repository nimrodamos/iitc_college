import React, { useState, useEffect } from "react";
import socket from "./socket";

interface Message {
  username: string;
  message: string;
}

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("General");
  const [users, setUsers] = useState<{ username: string }[]>([]);

  useEffect(() => {
    const handleRecentMessages = (recentMessages: Message[]) => {
      setMessages(recentMessages);
    };

    const handleReceiveMessage = (data: Message) => {
      setMessages((prev) => [...prev, data]);
    };

    const handleRoomUsers = (users: { username: string }[]) => {
      setUsers(users);
    };

    socket.on("recentMessages", handleRecentMessages);
    socket.on("receiveMessage", handleReceiveMessage);
    socket.on("roomUsers", handleRoomUsers);

    return () => {
      socket.off("recentMessages", handleRecentMessages);
      socket.off("receiveMessage", handleReceiveMessage);
      socket.off("roomUsers", handleRoomUsers);
    };
  }, []);

  const joinRoom = () => {
    if (username && room) {
      socket.emit("joinRoom", { username, room });
    }
  };

  const sendMessage = () => {
    if (message) {
      socket.emit("sendMessage", { room, username, message });
      setMessage("");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white w-full max-w-2xl shadow-md rounded-lg p-4">
        <h1 className="text-2xl font-bold text-center mb-4">Chat App</h1>

        {/* Username and Room Selection */}
        <div className="flex items-center justify-between mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2 rounded w-full mr-2"
          />
          <select
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="General">General</option>
            <option value="Sports">Sports</option>
            <option value="Movies">Movies</option>
          </select>
          <button
            onClick={joinRoom}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-2"
          >
            Join
          </button>
        </div>

        {/* List of users in the room */}
        <div className="border rounded p-2 mb-4 bg-gray-50">
          <p className="font-semibold mb-2">Users in room:</p>
          {users.map((user, index) => (
            <p key={index} className="text-sm">
              {user.username}
            </p>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="border rounded h-64 overflow-y-scroll mb-4 p-2 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.username === username ? "text-right" : "text-left"
              }`}
            >
              <p className="text-sm">
                <span className="font-semibold">{msg.username}:</span>{" "}
                {msg.message}
              </p>
            </div>
          ))}
        </div>

        {/* Send Message */}
        <div className="flex">
          <input
            type="text"
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded w-full"
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded ml-2"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
