export const MOCK_FLIGHTS = [
  {
    id: 'FL-101',
    airline: 'SkyWings',
    flightNumber: 'SW101',
    origin: 'DEL',
    destination: 'BOM',
    departure: '2025-03-15T08:00:00',
    arrival: '2025-03-15T10:15:00',
    duration: 135,
    price: 4500,
    seatsAvailable: 12,
  },
  {
    id: 'FL-102',
    airline: 'JetFast',
    flightNumber: 'JF202',
    origin: 'DEL',
    destination: 'BOM',
    departure: '2025-03-15T14:30:00',
    arrival: '2025-03-15T16:45:00',
    duration: 135,
    price: 5200,
    seatsAvailable: 8,
  },
  {
    id: 'FL-103',
    airline: 'SkyWings',
    flightNumber: 'SW103',
    origin: 'DEL',
    destination: 'BOM',
    departure: '2025-03-15T18:00:00',
    arrival: '2025-03-15T20:15:00',
    duration: 135,
    price: 4800,
    seatsAvailable: 15,
  },
  {
    id: 'FL-104',
    airline: 'AirConnect',
    flightNumber: 'AC404',
    origin: 'BOM',
    destination: 'DEL',
    departure: '2025-03-16T09:00:00',
    arrival: '2025-03-16T11:15:00',
    duration: 135,
    price: 4900,
    seatsAvailable: 20,
  },
];

export function getFlightsByRoute(origin, destination) {
  return MOCK_FLIGHTS.filter(
    (f) => f.origin === origin && f.destination === destination
  );
}

export function getFlightById(id) {
  return MOCK_FLIGHTS.find((f) => f.id === id);
}
