const rideModel = require('../models/ride.model');
const mapsService = require('../services/maps.service');
const crypto = require('crypto');

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error('Pickup and Destination required');
  }

  const { distanceMeters, durationSeconds } =
    await mapsService.getDistanceTime(pickup, destination);

  const distanceKm = distanceMeters / 1000;
  const durationMinutes = durationSeconds / 60;

  const basefare = {
    auto: 30,
    car: 50,
    motorcycle: 20,
  };
  const perKmRate = {
    auto: 10,
    car: 15,
    motorcycle: 8,
  };
  const perMinRate = {
    auto: 2,
    car: 3,
    motorcycle: 1.5,
  };

  const fare = {
    auto:
      basefare.auto +
      perKmRate.auto * distanceKm +
      perMinRate.auto * durationMinutes,
    car:
      basefare.car +
      perKmRate.car * distanceKm +
      perMinRate.car * durationMinutes,
    motorcycle:
      basefare.motorcycle +
      perKmRate.motorcycle * distanceKm +
      perMinRate.motorcycle * durationMinutes,
  };

  return { fare, distanceKm, durationMinutes };
}

function getOtp(number){
    function genOtp(number){
        const otp = crypto.randomInt(
            Math.pow(10,number-1),
            Math.pow(10,number)
        ).toString();
        return otp;
    }
    return genOtp(number);
}



module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error('All fields are required');
  }

  const allowedTypes = ['auto', 'car', 'motorcycle'];
  if (!allowedTypes.includes(vehicleType)) {
    throw new Error('Invalid vehicle type');
  }

  const { fare, distanceKm, durationMinutes } = await getFare(pickup, destination);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    otp: getOtp(6),
    fare: fare[vehicleType],
    distance: distanceKm,
    duration: durationMinutes,
  });

  return ride;
};
