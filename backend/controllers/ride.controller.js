const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');



module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const ride = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    res.status(201).json(ride);

    (async () => {
      try {
        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);
        console.log(pickupCoordinates);
        const captainInRadius = await mapsService.getCaptainInTheRadius(
          pickupCoordinates.latitude,
          pickupCoordinates.longitude,
          5 //radius in km
        );

        console.log("captainInRadius:", captainInRadius);

        ride.otp = ""
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');

        captainInRadius.map(captain => {
          console.log(captain, ride);
          sendMessageToSocketId(captain.socketId, { event: 'new-ride-request', data: rideWithUser });
        })
      } catch (err) {
        console.error("Post-createRide side-effect error:", err.message);
      }
    })();
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};




module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  const { pickup, destination } = req.query;
  try {
    const ride = await rideService.getFare(pickup, destination);
    return res.status(200).json(ride);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}




module.exports.confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  const { rideId } = req.body;
  
  try {
    const ride = await rideService.confirmRide(rideId, req.captain._id);
    sendMessageToSocketId(ride.user.socketId,{
      event: 'ride-confirmed',
      data: ride
    })
    return res.status(200).json(ride);
  } catch (error) {
    return res.status(500).json({error: error.message}); 
  }
}