const rideModel = require("../models/ride.model");
const mapsService = require("../services/maps.service");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination required");
  }

  const distanceTime = await mapsService.getDistanceTime(pickup, destination);

  //calculate fare for auto,car and bike
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
      perKmRate.auto * (distanceTime.distance.value / 1000) +
      perMinRate.auto * (distanceTime.duration.value / 60),
    car:
      basefare.car +
      perKmRate.car * (distanceTime.distance.value / 1000) +
      perMinRate.car * (distanceTime.duration.value / 60),
    motorcycle:
      basefare.motorcycle +
      perKmRate.motorcycle * (distanceTime.distance.value / 1000) +
      perMinRate.motorcycle * (distanceTime.duration.value / 60),
  };
  return fare;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }
  const fare = await getFare(pickup, destination);
  console.log(fare);
  const ride = rideModel.create({
    user,
    pickup,
    destination,
    fare: fare[vehicleType],
  });
  return ride;
};
