// backend/services/maps.service.js
const axios = require('axios');
require('dotenv').config();

const RADAR_API_KEY = process.env.RADAR_MAP_API;

if (!RADAR_API_KEY) {
  throw new Error('RADAR_API_KEY is not set in environment variables');
}

async function getAddressCoordinates(address) {
  try {
    const response = await axios.get('https://api.radar.io/v1/geocode/forward', {
      params: {
        query: address,
        // country: 'IN',
      },
      headers: {
        Authorization: RADAR_API_KEY,
      },
    });

    const results =
      (response.data && (response.data.addresses || response.data.geocodes)) || [];

    if (!results.length) {
      throw new Error('No results from Radar');
    }

    const first = results[0];
    const latitude = first.latitude || (first.location && first.location.latitude);
    const longitude = first.longitude || (first.location && first.location.longitude);

    return { latitude, longitude };
  } catch (err) {
    console.error('Radar geocoding error:', err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  getAddressCoordinates,
};
