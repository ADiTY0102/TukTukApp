// socket.js
const socketIo = require('socket.io');

let io; 

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
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
