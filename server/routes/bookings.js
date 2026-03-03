const express = require('express');
const { createBooking, getBooking } = require('../data/store');

const router = express.Router();

router.post('/', (req, res) => {
  const { flightId, passengers, selectedSeats, baggageItems } = req.body || {};
  if (!flightId || !passengers || !Array.isArray(passengers)) {
    return res.status(400).json({ error: 'flightId and passengers array are required' });
  }
  const bookingId = createBooking({
    flightId,
    passengers,
    selectedSeats: selectedSeats || {},
    baggageItems: baggageItems || [],
  });
  res.status(201).json({ bookingId });
});

router.get('/:id', (req, res) => {
  const booking = getBooking(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  res.json(booking);
});

module.exports = router;
