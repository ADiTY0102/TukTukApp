// socket.js
const { Server } = require('socket.io');

let io; 

function initializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    // Example:
    socket.on('ping', (data) => {
      console.log('Received ping from', socket.id, data);
      socket.emit('pong', { message: 'pong', time: Date.now() });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected:', socket.id);
    });
  });

  return io;
}

// Send an event to a specific socket id
function sendMessageToSocketId(socketId, message) {
  if (io) {
    io.to(socketId).emit('message: ', message);
  }else{
    console.error('Socket.io not initialized.');
  }
  
}

module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
