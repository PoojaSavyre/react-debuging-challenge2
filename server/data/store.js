const FLIGHTS = [
  // DEL - BOM
  { id: 'FL-101', airline: 'SkyWings', flightNumber: 'SW101', origin: 'DEL', destination: 'BOM', departure: '2025-03-15T08:00:00', arrival: '2025-03-15T10:15:00', duration: 135, price: 4500, seatsAvailable: 12 },
  { id: 'FL-102', airline: 'JetFast', flightNumber: 'JF202', origin: 'DEL', destination: 'BOM', departure: '2025-03-15T14:30:00', arrival: '2025-03-15T16:45:00', duration: 135, price: 5200, seatsAvailable: 8 },
  { id: 'FL-103', airline: 'SkyWings', flightNumber: 'SW103', origin: 'DEL', destination: 'BOM', departure: '2025-03-15T18:00:00', arrival: '2025-03-15T20:15:00', duration: 135, price: 4800, seatsAvailable: 15 },
  { id: 'FL-104', airline: 'AirConnect', flightNumber: 'AC404', origin: 'BOM', destination: 'DEL', departure: '2025-03-16T09:00:00', arrival: '2025-03-16T11:15:00', duration: 135, price: 4900, seatsAvailable: 20 },
  { id: 'FL-105', airline: 'JetFast', flightNumber: 'JF205', origin: 'BOM', destination: 'DEL', departure: '2025-03-16T12:00:00', arrival: '2025-03-16T14:15:00', duration: 135, price: 5100, seatsAvailable: 14 },
  { id: 'FL-106', airline: 'SkyWings', flightNumber: 'SW106', origin: 'BOM', destination: 'DEL', departure: '2025-03-16T17:00:00', arrival: '2025-03-16T19:15:00', duration: 135, price: 4700, seatsAvailable: 9 },
  // DEL - BLR
  { id: 'FL-201', airline: 'SkyWings', flightNumber: 'SW201', origin: 'DEL', destination: 'BLR', departure: '2025-03-15T07:00:00', arrival: '2025-03-15T09:30:00', duration: 150, price: 6200, seatsAvailable: 18 },
  { id: 'FL-202', airline: 'JetFast', flightNumber: 'JF302', origin: 'DEL', destination: 'BLR', departure: '2025-03-15T11:00:00', arrival: '2025-03-15T13:30:00', duration: 150, price: 6800, seatsAvailable: 6 },
  { id: 'FL-203', airline: 'AirConnect', flightNumber: 'AC503', origin: 'BLR', destination: 'DEL', departure: '2025-03-15T15:00:00', arrival: '2025-03-15T17:30:00', duration: 150, price: 6500, seatsAvailable: 11 },
  { id: 'FL-204', airline: 'SkyWings', flightNumber: 'SW204', origin: 'BLR', destination: 'DEL', departure: '2025-03-16T08:00:00', arrival: '2025-03-16T10:30:00', duration: 150, price: 6300, seatsAvailable: 20 },
  // BOM - BLR
  { id: 'FL-301', airline: 'JetFast', flightNumber: 'JF401', origin: 'BOM', destination: 'BLR', departure: '2025-03-15T09:00:00', arrival: '2025-03-15T10:30:00', duration: 90, price: 4200, seatsAvailable: 15 },
  { id: 'FL-302', airline: 'SkyWings', flightNumber: 'SW302', origin: 'BOM', destination: 'BLR', departure: '2025-03-15T13:00:00', arrival: '2025-03-15T14:30:00', duration: 90, price: 4500, seatsAvailable: 8 },
  { id: 'FL-303', airline: 'AirConnect', flightNumber: 'AC603', origin: 'BLR', destination: 'BOM', departure: '2025-03-15T16:00:00', arrival: '2025-03-15T17:30:00', duration: 90, price: 4400, seatsAvailable: 12 },
  { id: 'FL-304', airline: 'JetFast', flightNumber: 'JF404', origin: 'BLR', destination: 'BOM', departure: '2025-03-16T10:00:00', arrival: '2025-03-16T11:30:00', duration: 90, price: 4300, seatsAvailable: 22 },
  // DEL - MAA
  { id: 'FL-401', airline: 'SkyWings', flightNumber: 'SW401', origin: 'DEL', destination: 'MAA', departure: '2025-03-15T06:30:00', arrival: '2025-03-15T09:15:00', duration: 165, price: 5800, seatsAvailable: 10 },
  { id: 'FL-402', airline: 'AirConnect', flightNumber: 'AC704', origin: 'DEL', destination: 'MAA', departure: '2025-03-15T14:00:00', arrival: '2025-03-15T16:45:00', duration: 165, price: 6100, seatsAvailable: 7 },
  { id: 'FL-403', airline: 'JetFast', flightNumber: 'JF505', origin: 'MAA', destination: 'DEL', departure: '2025-03-15T18:00:00', arrival: '2025-03-15T20:45:00', duration: 165, price: 5900, seatsAvailable: 14 },
  { id: 'FL-404', airline: 'SkyWings', flightNumber: 'SW404', origin: 'MAA', destination: 'DEL', departure: '2025-03-16T07:00:00', arrival: '2025-03-16T09:45:00', duration: 165, price: 5700, seatsAvailable: 16 },
  // BOM - PNQ (Pune)
  { id: 'FL-501', airline: 'JetFast', flightNumber: 'JF601', origin: 'BOM', destination: 'PNQ', departure: '2025-03-15T08:00:00', arrival: '2025-03-15T08:45:00', duration: 45, price: 2800, seatsAvailable: 24 },
  { id: 'FL-502', airline: 'SkyWings', flightNumber: 'SW502', origin: 'BOM', destination: 'PNQ', departure: '2025-03-15T12:00:00', arrival: '2025-03-15T12:45:00', duration: 45, price: 3000, seatsAvailable: 18 },
  { id: 'FL-503', airline: 'AirConnect', flightNumber: 'AC804', origin: 'PNQ', destination: 'BOM', departure: '2025-03-15T15:00:00', arrival: '2025-03-15T15:45:00', duration: 45, price: 2900, seatsAvailable: 20 },
  { id: 'FL-504', airline: 'JetFast', flightNumber: 'JF604', origin: 'PNQ', destination: 'BOM', departure: '2025-03-16T09:00:00', arrival: '2025-03-16T09:45:00', duration: 45, price: 2700, seatsAvailable: 12 },
  // DEL - CCU (Kolkata)
  { id: 'FL-601', airline: 'SkyWings', flightNumber: 'SW601', origin: 'DEL', destination: 'CCU', departure: '2025-03-15T07:30:00', arrival: '2025-03-15T09:30:00', duration: 120, price: 5200, seatsAvailable: 11 },
  { id: 'FL-602', airline: 'JetFast', flightNumber: 'JF702', origin: 'DEL', destination: 'CCU', departure: '2025-03-15T13:00:00', arrival: '2025-03-15T15:00:00', duration: 120, price: 5500, seatsAvailable: 9 },
  { id: 'FL-603', airline: 'AirConnect', flightNumber: 'AC905', origin: 'CCU', destination: 'DEL', departure: '2025-03-15T16:00:00', arrival: '2025-03-15T18:00:00', duration: 120, price: 5300, seatsAvailable: 15 },
  { id: 'FL-604', airline: 'SkyWings', flightNumber: 'SW604', origin: 'CCU', destination: 'DEL', departure: '2025-03-16T08:00:00', arrival: '2025-03-16T10:00:00', duration: 120, price: 5100, seatsAvailable: 19 },
  // BOM - HYD
  { id: 'FL-701', airline: 'JetFast', flightNumber: 'JF801', origin: 'BOM', destination: 'HYD', departure: '2025-03-15T09:30:00', arrival: '2025-03-15T11:15:00', duration: 105, price: 4600, seatsAvailable: 13 },
  { id: 'FL-702', airline: 'SkyWings', flightNumber: 'SW702', origin: 'BOM', destination: 'HYD', departure: '2025-03-15T14:00:00', arrival: '2025-03-15T15:45:00', duration: 105, price: 4800, seatsAvailable: 8 },
  { id: 'FL-703', airline: 'AirConnect', flightNumber: 'AC1006', origin: 'HYD', destination: 'BOM', departure: '2025-03-15T17:00:00', arrival: '2025-03-15T18:45:00', duration: 105, price: 4700, seatsAvailable: 17 },
  { id: 'FL-704', airline: 'JetFast', flightNumber: 'JF804', origin: 'HYD', destination: 'BOM', departure: '2025-03-16T10:00:00', arrival: '2025-03-16T11:45:00', duration: 105, price: 4500, seatsAvailable: 21 },
  // DEL - HYD
  { id: 'FL-801', airline: 'SkyWings', flightNumber: 'SW801', origin: 'DEL', destination: 'HYD', departure: '2025-03-15T08:00:00', arrival: '2025-03-15T10:15:00', duration: 135, price: 5400, seatsAvailable: 10 },
  { id: 'FL-802', airline: 'JetFast', flightNumber: 'JF902', origin: 'DEL', destination: 'HYD', departure: '2025-03-15T15:00:00', arrival: '2025-03-15T17:15:00', duration: 135, price: 5700, seatsAvailable: 6 },
  { id: 'FL-803', airline: 'AirConnect', flightNumber: 'AC1107', origin: 'HYD', destination: 'DEL', departure: '2025-03-15T18:30:00', arrival: '2025-03-15T20:45:00', duration: 135, price: 5500, seatsAvailable: 14 },
  // BLR - MAA
  { id: 'FL-901', airline: 'JetFast', flightNumber: 'JF1001', origin: 'BLR', destination: 'MAA', departure: '2025-03-15T09:00:00', arrival: '2025-03-15T10:00:00', duration: 60, price: 3200, seatsAvailable: 25 },
  { id: 'FL-902', airline: 'SkyWings', flightNumber: 'SW902', origin: 'BLR', destination: 'MAA', departure: '2025-03-15T14:00:00', arrival: '2025-03-15T15:00:00', duration: 60, price: 3400, seatsAvailable: 18 },
  { id: 'FL-903', airline: 'AirConnect', flightNumber: 'AC1208', origin: 'MAA', destination: 'BLR', departure: '2025-03-15T16:00:00', arrival: '2025-03-15T17:00:00', duration: 60, price: 3300, seatsAvailable: 22 },
  { id: 'FL-904', airline: 'JetFast', flightNumber: 'JF1004', origin: 'MAA', destination: 'BLR', departure: '2025-03-16T08:00:00', arrival: '2025-03-16T09:00:00', duration: 60, price: 3100, seatsAvailable: 16 },
  // BOM - CCU
  { id: 'FL-1001', airline: 'SkyWings', flightNumber: 'SW1001', origin: 'BOM', destination: 'CCU', departure: '2025-03-15T07:00:00', arrival: '2025-03-15T09:30:00', duration: 150, price: 6100, seatsAvailable: 9 },
  { id: 'FL-1002', airline: 'JetFast', flightNumber: 'JF1102', origin: 'BOM', destination: 'CCU', departure: '2025-03-15T12:00:00', arrival: '2025-03-15T14:30:00', duration: 150, price: 6400, seatsAvailable: 12 },
  { id: 'FL-1003', airline: 'AirConnect', flightNumber: 'AC1309', origin: 'CCU', destination: 'BOM', departure: '2025-03-15T16:00:00', arrival: '2025-03-15T18:30:00', duration: 150, price: 6200, seatsAvailable: 7 },
  // DEL - PNQ
  { id: 'FL-1101', airline: 'JetFast', flightNumber: 'JF1201', origin: 'DEL', destination: 'PNQ', departure: '2025-03-15T10:00:00', arrival: '2025-03-15T12:00:00', duration: 120, price: 4900, seatsAvailable: 14 },
  { id: 'FL-1102', airline: 'SkyWings', flightNumber: 'SW1102', origin: 'DEL', destination: 'PNQ', departure: '2025-03-15T17:00:00', arrival: '2025-03-15T19:00:00', duration: 120, price: 5100, seatsAvailable: 8 },
  { id: 'FL-1103', airline: 'AirConnect', flightNumber: 'AC1410', origin: 'PNQ', destination: 'DEL', departure: '2025-03-16T08:00:00', arrival: '2025-03-16T10:00:00', duration: 120, price: 5000, seatsAvailable: 11 },
  // BLR - HYD
  { id: 'FL-1201', airline: 'JetFast', flightNumber: 'JF1301', origin: 'BLR', destination: 'HYD', departure: '2025-03-15T08:00:00', arrival: '2025-03-15T09:00:00', duration: 60, price: 3500, seatsAvailable: 20 },
  { id: 'FL-1202', airline: 'SkyWings', flightNumber: 'SW1202', origin: 'BLR', destination: 'HYD', departure: '2025-03-15T13:00:00', arrival: '2025-03-15T14:00:00', duration: 60, price: 3700, seatsAvailable: 15 },
  { id: 'FL-1203', airline: 'AirConnect', flightNumber: 'AC1511', origin: 'HYD', destination: 'BLR', departure: '2025-03-15T18:00:00', arrival: '2025-03-15T19:00:00', duration: 60, price: 3600, seatsAvailable: 19 },
  // MAA - CCU
  { id: 'FL-1301', airline: 'SkyWings', flightNumber: 'SW1301', origin: 'MAA', destination: 'CCU', departure: '2025-03-15T09:00:00', arrival: '2025-03-15T11:15:00', duration: 135, price: 5600, seatsAvailable: 10 },
  { id: 'FL-1302', airline: 'JetFast', flightNumber: 'JF1402', origin: 'CCU', destination: 'MAA', departure: '2025-03-15T14:00:00', arrival: '2025-03-15T16:15:00', duration: 135, price: 5800, seatsAvailable: 13 },
  // COK - BOM
  { id: 'FL-1401', airline: 'JetFast', flightNumber: 'JF1501', origin: 'BOM', destination: 'COK', departure: '2025-03-15T08:30:00', arrival: '2025-03-15T10:15:00', duration: 105, price: 4800, seatsAvailable: 16 },
  { id: 'FL-1402', airline: 'SkyWings', flightNumber: 'SW1402', origin: 'COK', destination: 'BOM', departure: '2025-03-15T15:00:00', arrival: '2025-03-15T16:45:00', duration: 105, price: 5000, seatsAvailable: 11 },
  // GOI - BOM
  { id: 'FL-1501', airline: 'AirConnect', flightNumber: 'AC1601', origin: 'BOM', destination: 'GOI', departure: '2025-03-15T10:00:00', arrival: '2025-03-15T10:45:00', duration: 45, price: 3200, seatsAvailable: 22 },
  { id: 'FL-1502', airline: 'JetFast', flightNumber: 'JF1602', origin: 'GOI', destination: 'BOM', departure: '2025-03-15T14:00:00', arrival: '2025-03-15T14:45:00', duration: 45, price: 3100, seatsAvailable: 18 },
  // AMD - BOM
  { id: 'FL-1601', airline: 'SkyWings', flightNumber: 'SW1501', origin: 'AMD', destination: 'BOM', departure: '2025-03-15T09:00:00', arrival: '2025-03-15T10:15:00', duration: 75, price: 3800, seatsAvailable: 14 },
  { id: 'FL-1602', airline: 'JetFast', flightNumber: 'JF1702', origin: 'BOM', destination: 'AMD', departure: '2025-03-15T16:00:00', arrival: '2025-03-15T17:15:00', duration: 75, price: 4000, seatsAvailable: 9 },
];

const users = new Map();
const tokens = new Map();
const bookings = new Map();

function getFlightsByRoute(origin, destination) {
  return FLIGHTS.filter(
    (f) => f.origin === origin && f.destination === destination
  );
}

function getFlightById(id) {
  return FLIGHTS.find((f) => f.id === id);
}

function createUser(email, name) {
  const id = 'user-' + Date.now();
  const user = { id, email, name };
  users.set(email, user);
  return user;
}

function getUserByEmail(email) {
  return users.get(email) || null;
}

function createToken(user) {
  const token = 'tk_' + Date.now() + '_' + Math.random().toString(36).slice(2);
  tokens.set(token, { userId: user.id, email: user.email });
  return token;
}

function getUserByToken(token) {
  const data = tokens.get(token);
  if (!data) return null;
  const user = users.get(data.email);
  return user || null;
}

function deleteToken(token) {
  tokens.delete(token);
}

function createBooking(payload) {
  const bookingId = 'BK-' + Date.now();
  const booking = {
    id: bookingId,
    ...payload,
    createdAt: new Date().toISOString(),
  };
  bookings.set(bookingId, booking);
  return bookingId;
}

function getBooking(id) {
  return bookings.get(id) || null;
}

module.exports = {
  getFlightsByRoute,
  getFlightById,
  createUser,
  getUserByEmail,
  createToken,
  getUserByToken,
  deleteToken,
  createBooking,
  getBooking,
};
