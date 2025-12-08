// backend/controllers/map.controller.js
const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinates(address);
    return res.status(200).json({ coordinates });
  } catch (err) {
    console.error("getCoordinates error:", err.message);
    return res.status(404).json({ message: "Coordinates Not Found" });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;
    const distanceTime = await mapService.getDistanceTime(origin, destination);
    return res.status(200).json({ distanceTime });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.getAutoCompleteSuggestions = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { text } = req.query; 
    const suggestions = await mapService.getAutoCompleteSuggestions(text);
    return res.status(200).json({ suggestions });
  } catch (err) {
    console.error('getAutoSuggestions error:', err.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};