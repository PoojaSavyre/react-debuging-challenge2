import React, { memo } from 'react';
import { AppLink } from '../AppLink';
import PropTypes from 'prop-types';

function FlightCardComponent({ flight }) {
  const dep = new Date(flight.departure);
  const arr = new Date(flight.arrival);
  const durationMins = flight.duration;
  const hours = Math.floor(durationMins / 60);
  const mins = durationMins % 60;

  return (
    <div className="card flight-card" data-testid="flight-card">
      <div className="flight-card-row">
        <div>
          <div className="flight-card-airline">{flight.airline} {flight.flightNumber}</div>
          <div className="flight-card-route">
            {flight.origin} → {flight.destination} · {flight.seatsAvailable} seats left
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: '1rem' }}>
            {dep.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} →{' '}
            {arr.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{hours}h {mins}m</div>
        </div>
        <div className="flight-card-price">₹{flight.price.toLocaleString()}</div>
        <AppLink to={`/flight/${flight.id}`} className="btn btn-primary" data-testid="flight-card-select">
          Select
        </AppLink>
      </div>
    </div>
  );
}

FlightCardComponent.propTypes = {
  flight: PropTypes.shape({
    id: PropTypes.string,
    airline: PropTypes.string,
    flightNumber: PropTypes.string,
    origin: PropTypes.string,
    destination: PropTypes.string,
    departure: PropTypes.string,
    arrival: PropTypes.string,
    duration: PropTypes.number,
    price: PropTypes.number,
    seatsAvailable: PropTypes.number,
  }).isRequired,
};

export const FlightCard = memo(FlightCardComponent);
