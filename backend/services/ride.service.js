const { validationResult } = require('express-validator');
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
      Math.round(basefare.auto +
        perKmRate.auto * distanceKm +
        perMinRate.auto * durationMinutes),
    car:
      Math.round(basefare.car +
        perKmRate.car * distanceKm +
        perMinRate.car * durationMinutes),
    motorcycle:
      Math.round(basefare.motorcycle +
        perKmRate.motorcycle * distanceKm +
        perMinRate.motorcycle * durationMinutes),
  };

  return { fare, distanceKm, durationMinutes };
}
module.exports.getFare = getFare;



function getOtp(number) {
  function genOtp(number) {
    const otp = crypto.randomInt(
      Math.pow(10, number - 1),
      Math.pow(10, number)
    ).toString();
    return otp;
  }
  return genOtp(number);
}



module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
  if (!user) throw new Error('User is required');
  if (!pickup || !destination) throw new Error('Pickup and destination are required');
  if (!vehicleType) throw new Error('Vehicle type is required');

  // compute fare and distance/time
  const { fare, distanceKm, durationMinutes } = await getFare(pickup, destination);
  const fareForType = fare[vehicleType];

  // create OTP
  const otp = getOtp(4);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    fare: fareForType,
    distance: distanceKm,
    duration: durationMinutes,
    otp,
  });

  return ride;
};


module.exports.confirmRide = async (rideId) => {
  if (!rideId) throw new Error('Ride ID is required');

  await rideModel.findByIdAndUpdate({
    _id : rideId
  },{
    status: 'accepted!',
    captain: captainId
  })  


  const ride = await rideModel.findOne(
    { _id: rideId }
  ).populate('user');

  if (!ride) {
    throw new Error('Ride not found');
  }

  // ride.status = 'accepted!';
  return ride
}