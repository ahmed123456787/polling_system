import { Server } from "socket.io";
import server from "./server.js";

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

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export default io;
