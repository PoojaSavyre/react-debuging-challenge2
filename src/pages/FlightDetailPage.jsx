import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { apiRequest } from '../api/client';
import { PageHeader } from '../components/PageHeader';

export function FlightDetailPage() {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { setSelectedFlight } = useBooking();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    apiRequest(`api/flights/${encodeURIComponent(flightId)}`)
      .then((data) => {
        if (!cancelled) setFlight(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Failed to load flight');
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [flightId]);

  const handleSelect = () => {
    setSelectedFlight(flight);
    navigate('/passengers');
  };

  if (loading) {
    return (
      <>
        <PageHeader title="Flight details" subtitle="Loading..." />
        <div className="container">
          <div className="content-section" style={{ textAlign: 'center', padding: '3rem' }} data-testid="flight-detail-loading">
            <p className="content-lead">Loading flight...</p>
          </div>
        </div>
      </>
    );
  }

  if (error || !flight) {
    return (
      <>
        <PageHeader title="Flight details" subtitle="Something went wrong" />
        <div className="container">
          <div className="content-section">
            <p className="content-lead">{error || 'Flight not found.'}</p>
            <button type="button" className="btn btn-secondary" data-testid="flight-detail-back" onClick={() => navigate('/search')}>
              Back to results
            </button>
          </div>
        </div>
      </>
    );
  }

  const dep = new Date(flight.departure);
  const arr = new Date(flight.arrival);
  const hours = Math.floor(flight.duration / 60);
  const mins = flight.duration % 60;

  return (
    <>
      <PageHeader
        title={`${flight.airline} ${flight.flightNumber}`}
        subtitle={`${flight.origin} → ${flight.destination}`}
      />
      <div className="container">
        <div className="content-section">
          <div className="flight-card-row" style={{ marginBottom: '1rem' }}>
            <div>
              <div className="flight-card-airline">{flight.airline} {flight.flightNumber}</div>
              <div className="flight-card-route">{flight.origin} → {flight.destination}</div>
            </div>
            <div className="flight-card-price">₹{flight.price.toLocaleString()}</div>
          </div>
          <p>Departure: {dep.toLocaleString()}</p>
          <p>Arrival: {arr.toLocaleString()}</p>
          <p>Duration: {hours}h {mins}m · {flight.seatsAvailable} seats available</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn btn-primary" data-testid="flight-detail-continue" onClick={handleSelect}>
              Continue to passenger details
            </button>
            <button type="button" className="btn btn-secondary" data-testid="flight-detail-back" onClick={() => navigate('/search')}>
              Back to results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
