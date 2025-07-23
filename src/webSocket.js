import { Server } from "socket.io";
import { setIO } from "./utils/webSocketState.js";

// Export a function that initializes the WebSocket server with the provided HTTP server
export const initWebSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle incoming messages
    socket.on("message", (data) => {
      console.log("Message received:", data);
      io.emit("message", data);
    });

    // Join a specific poll room to receive updates for that poll
    socket.on("joinPoll", (pollId) => {
      socket.join(`poll_${pollId}`);
      console.log(`Client joined poll room: poll_${pollId}`);
    });

    // Leave a specific poll room
    socket.on("leavePoll", (pollId) => {
      socket.leave(`poll_${pollId}`);
      console.log(`Client left poll room: poll_${pollId}`);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // Store the io instance in our shared state
  setIO(io);

  return io;
};
