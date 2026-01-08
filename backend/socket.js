// socket.js
const socketIo = require("socket.io");
const userModel = require("./models/user.model");
const captainModel = require("./models/captain.model");

let io;

function initializeSocket(server) {
  io = socketIo(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("join", async (data) => {
      const { userId, userType } = data;
      console.log(`User ${userId} joined as ${userType}`);

      if (userType === "user") {
        await userModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      } else {
        await captainModel.findByIdAndUpdate(userId, {
          socketId: socket.id,
        });
      }
    });

    //method for getting message function works and location updated

    socket.on("update-location-captain", async (data) => {
      const { userId, location } = data;
      //console.log(`Updating location for  ${userId}: as ${location}`);

      if (!location || !location.latitude || !location.longitude) {
        return socket.emit('error', { message: 'Invalid location data' })
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })

    })

    socket.on('update-location-captain', async (data) => {
      const { userId, location } = data;
      if (!location || !location.latitude || !location.longitude) {
        return socket.emit('error', { message: 'Invalid location data' })
      }

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      })

    })


    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
}
const sendMessageToSocketId = (socketId, messageObject) => {

console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}
module.exports = {
  initializeSocket,
  sendMessageToSocketId,
};
