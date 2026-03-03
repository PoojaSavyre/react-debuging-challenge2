const express = require('express');
const { getFlightsByRoute, getFlightById } = require('../data/store');

const router = express.Router();

router.get('/', (req, res) => {
  const { origin, destination } = req.query;
  if (!origin || !destination) {
    return res.status(400).json({ error: 'origin and destination are required' });
  }
  const flights = getFlightsByRoute(origin.toUpperCase(), destination.toUpperCase());
  res.json(flights);
});

router.get('/:id', (req, res) => {
  const flight = getFlightById(req.params.id);
  if (!flight) {
    return res.status(404).json({ error: 'Flight not found' });
  }
  res.json(flight);
});

module.exports = router;
