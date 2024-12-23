import { io, Socket } from "socket.io-client";

// טיפוסים של אירועים מהשרת ללקוח
interface ServerToClientEvents {
  recentMessages: (data: { username: string; message: string }[]) => void;
  receiveMessage: (data: { username: string; message: string }) => void;
  roomUsers: (users: { username: string }[]) => void;
}

// טיפוסים של אירועים מהלקוח לשרת
interface ClientToServerEvents {
  joinRoom: (data: { username: string; room: string }) => void;
  sendMessage: (data: {
    room: string;
    username: string;
    message: string;
  }) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000"
);

export default socket;
