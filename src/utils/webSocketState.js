// This module keeps a reference to the initialized WebSocket instance
let io = null;

export const setIO = (ioInstance) => {
  io = ioInstance;
};

export const getIO = () => {
  if (!io) {
    throw new Error("WebSocket IO is not initialized yet");
  }
  return io;
};
