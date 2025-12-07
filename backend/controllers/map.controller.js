// backend/controllers/map.controller.js
const mapService = require('../services/maps.service');
const { validationResult } = require('express-validator');

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
    console.error('getCoordinates error:', err.message);
    return res.status(404).json({ message: 'Coordinates Not Found' });
  }
};
