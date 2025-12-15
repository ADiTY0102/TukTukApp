const axios = require('axios');
require('dotenv').config();

const MAPMYINDIA_STATIC_KEY = process.env.MAPMYINDIA_STATIC_KEY;

const RADAR_API_KEY = process.env.RADAR_MAP_API;

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

  const resolveCoords = async (value) => {
    if (typeof value === 'string') {
      return getAddressCoordinates(value);
    }
    if (value.latitude != null && value.longitude != null) {
      return { latitude: value.latitude, longitude: value.longitude };
    }
    if (value.lat != null && value.lng != null) {
      return { latitude: value.lat, longitude: value.lng };
    }
    return null;
  };

  try {
    const originCoords = await resolveCoords(origin);
    const destinationCoords = await resolveCoords(destination);

    if (!originCoords || !destinationCoords) {
      throw new Error('Could not resolve origin or destination to coordinates');
    }

    const originParam = `${originCoords.latitude},${originCoords.longitude}`;
    const destinationParam = `${destinationCoords.latitude},${destinationCoords.longitude}`;

    // ✅ define url before using it
    const url = 'https://api.radar.io/v1/route/distance';

    const response = await axios.get(url, {
      params: {
        origin: originParam,
        destination: destinationParam,
        modes: 'car',
        units: 'metric',
      },
      headers: {
        Authorization: RADAR_API_KEY,
      },
      timeout: 5000,
    });

    const data = response.data;
    const route =
      data.routes?.car ||
      data.routes?.['car'] ||
      data.route ||
      data.routes?.[0];

    if (!route) {
      throw new Error('No valid route in Radar response');
    }

    const distanceMeters =
      route.distance?.value ?? route.distance ?? route.length;
    const durationSeconds =
      route.duration?.value ?? route.duration ?? route.time;

    if (distanceMeters == null || durationSeconds == null) {
      throw new Error('Radar route missing distance or duration');
    }

    return { distanceMeters, durationSeconds, raw: route };
  } catch (err) {
    const meta = err.response?.data?.meta;
    if (meta) {
      console.error('Radar route/distance error:', meta);
      throw new Error(meta.message || 'Radar routing failed');
    }
    console.error('Radar route/distance error:', err.response?.data || err.message);
    throw err;
  }
}




async function getAutoCompleteSuggestions(queryText) {
  if (!queryText) throw new Error('Query text is required');

  try {
    const url =
      'https://search.mappls.com/search/places/autosuggest/json' +
      `?query=${encodeURIComponent(queryText)}` +
      '&region=IND&tokenizeAddress=true' +
      `&access_token=${MAPMYINDIA_STATIC_KEY}`;

    const response = await axios.get(url, {
      // no extra headers, no body
      timeout: 5000,
    });

    const locations = response.data?.suggestedLocations || [];

    return locations.map(loc => ({
      address: loc.placeAddress,
      name: loc.placeName,
      eLoc: loc.eLoc,
      type: loc.type,
    }));
  } catch (err) {
    console.error(
      'MapmyIndia autosuggest error:',
      err.response?.status,
      err.response?.data || err.message
    );
    throw err;
  }
}

module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
};

module.exports = {
  getAddressCoordinates,
  getDistanceTime,
  getAutoCompleteSuggestions,
};