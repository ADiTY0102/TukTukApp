const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapsService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');



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

    // 2) send response ONCE
    res.status(201).json(ride);

    // 3) fire-and-forget extra work (no res.* inside)
    (async () => {
      try {
        const pickupCoordinates = await mapsService.getAddressCoordinates(pickup);

        const captainInRadius = await mapsService.getCaptainInTheRadius(
          pickupCoordinates.latitude,
          pickupCoordinates.longitude,
          2
        );

        console.log("captainInRadius:", captainInRadius);
        // you can also call sendMessageToSocketId here
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