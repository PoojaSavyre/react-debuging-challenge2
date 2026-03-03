const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const flightsRoutes = require('./routes/flights');
const bookingsRoutes = require('./routes/bookings');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightsRoutes);
app.use('/api/bookings', bookingsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
