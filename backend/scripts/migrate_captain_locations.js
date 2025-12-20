require('dotenv').config();
const mongoose = require('mongoose');
const captainModel = require('../models/captain.model');

async function run() {
  const uri = process.env.DB_CONNECT;
  if (!uri) {
    console.error('DB_CONNECT not set in .env');
    process.exit(1);
  }

  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to DB for migration');

  const captains = await captainModel.find({
    $or: [
      { 'location.coordinates': { $exists: false } },
      { 'location.type': { $ne: 'Point' } }
    ]
  });

  let updated = 0;
  for (const c of captains) {
    // if old fields exist (ltd/lng), convert
    const oldLat = c.location && c.location.ltd;
    const oldLng = c.location && c.location.lng;

    if (oldLat != null && oldLng != null) {
      await captainModel.updateOne({ _id: c._id }, {
        $set: { 'location': { type: 'Point', coordinates: [Number(oldLng), Number(oldLat)] } },
        $unset: { 'location.ltd': '', 'location.lng': '' }
      });
      updated++;
      console.log(`Updated captain ${c._id}`);
    }
  }

  console.log(`Migration complete. Updated ${updated} documents.`);
  await mongoose.disconnect();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
