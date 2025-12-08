const axios = require('axios');
require('dotenv').config();

const RADAR_API_KEY = process.env.RADAR_MAP_API;
const MAPMYINDIA_STATIC_KEY = process.env.MAPMYINDIA_STATIC_KEY;


if (!RADAR_API_KEY) {
  throw new Error('RADAR_API_KEY is not set in environment variables');
}
if (!MAPMYINDIA_STATIC_KEY) {
  throw new Error('MAPMYINDIA_API_KEY is not set in environment variables');
}




async function getAddressCoordinates(address) {
  try {
    const response = await axios.get('https://api.radar.io/v1/geocode/forward', {
      params: { query: address },
      headers: { Authorization: RADAR_API_KEY },
    });

    const results = (response.data && (response.data.addresses || response.data.geocodes)) || [];

    if (!results.length) {
      throw new Error('No results from Radar for address: ' + address);
    }

    const first = results[0];
    const latitude = first.latitude ?? first.location?.latitude ?? first.location?.lat;
    const longitude = first.longitude ?? first.location?.longitude ?? first.location?.lng;

    if (latitude == null || longitude == null) {
      throw new Error('Radar response missing lat/lng for address: ' + address);
    }

    return { latitude: Number(latitude), longitude: Number(longitude) };
  } catch (err) {
    console.error('Radar geocoding error:', err.response?.data || err.message);
    throw err;
  }
}

async function getDistanceTime(origin, destination) {
  if (!origin || !destination) {
    throw new Error('Origin and Destination are required');
  }

  try {
    const originCoords =
      typeof origin === 'string'
        ? await getAddressCoordinates(origin)
        : (origin.latitude != null && origin.longitude != null
            ? origin
            : (origin.lat != null && origin.lng != null
                ? { latitude: origin.lat, longitude: origin.lng }
                : null));

    const destinationCoords =
      typeof destination === 'string'
        ? await getAddressCoordinates(destination)
        : (destination.latitude != null && destination.longitude != null
            ? destination
            : (destination.lat != null && destination.lng != null
                ? { latitude: destination.lat, longitude: destination.lng }
                : null));

    if (!originCoords || !destinationCoords) {
      throw new Error('Could not resolve origin or destination to coordinates');
    }

    const originParam = `${originCoords.latitude},${originCoords.longitude}`;
    const destinationParam = `${destinationCoords.latitude},${destinationCoords.longitude}`;

    const url = 'https://api.radar.io/v1/route/distance';

    const response = await axios.get(url, {
      params: {
        origin: originParam,
        destination: destinationParam,
        modes: 'car',           // <-- REQUIRED
        units: 'metric',        // optional, but useful in India
      },
      headers: {
        Authorization: RADAR_API_KEY,
      },
      timeout: 5000,
    });

    return response.data;
  } catch (err) {
    console.error('Radar route/distance error:', err.response?.data || err.message);
    throw err;
  }
}


async function getAutoCompleteSuggestions(queryText) {
  if (!queryText) throw new Error('Query text is required');

  const response = await axios.get(
    'https://search.mappls.com/search/places/autosuggest/json',
    {
      params: {
        access_token: MAPMYINDIA_STATIC_KEY, // STATIC KEY HERE
        query: queryText,
        region: 'IND',
        tokenizeAddress: true,
      },
      timeout: 5000,
    }
  );

  const locations = response.data?.suggestedLocations || [];
  return locations.map(loc => ({
    address: loc.placeAddress,
    name: loc.placeName,
    eLoc: loc.eLoc,
    lat: loc.latitude,
    lng: loc.longitude,
    type: loc.type,
  }));
}
module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions
};