import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/PageHeader';

export function ReviewPage() {
  const navigate = useNavigate();
  const {
    selectedFlight,
    passengers,
    selectedSeats,
    baggageItems,
    confirmBooking,
  } = useBooking();
  const [confirming, setConfirming] = useState(false);
  const [confirmError, setConfirmError] = useState('');

  useEffect(() => {
    if (!selectedFlight) {
      navigate('/search', { replace: true });
    }
  }, [selectedFlight, navigate]);

  const handleConfirm = async () => {
    setConfirmError('');
    setConfirming(true);
    try {
      await confirmBooking();
      navigate('/confirmation');
    } catch (err) {
      setConfirmError(err.body?.error || err.message || 'Booking failed');
    } finally {
      setConfirming(false);
    }
  };

  if (!selectedFlight) {
    return null;
  }

  const dep = new Date(selectedFlight.departure);
  const arr = new Date(selectedFlight.arrival);

  return (
    <>
      <PageHeader title="Review your booking" subtitle={`${selectedFlight.airline} ${selectedFlight.flightNumber} · ${selectedFlight.origin} → ${selectedFlight.destination}`} />
      <div className="container">
      <div className="content-section">
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3>Flight</h3>
        <p>{selectedFlight.airline} {selectedFlight.flightNumber}</p>
        <p>{selectedFlight.origin} → {selectedFlight.destination}</p>
        <p>{dep.toLocaleString()} – {arr.toLocaleString()}</p>
        <p><strong>₹{selectedFlight.price.toLocaleString()}</strong></p>
      </div>
      <div className="card">
        <h3>Passengers</h3>
        {passengers.map((p) => (
          <p key={p.id}>
            {p.name} · {p.email}
            {selectedSeats[p.id] && ` · Seat ${selectedSeats[p.id]}`}
          </p>
        ))}
      </div>
      {baggageItems?.length > 0 && (
        <div className="card">
          <h3>Baggage</h3>
          {baggageItems.map((b) => (
            <p key={b.id}>{b.label} – {b.weight}</p>
          ))}
        </div>
      )}
      <div className="card">
        <p>
          Total: <strong>₹{selectedFlight.price.toLocaleString()}</strong>
        </p>
        {confirmError && <p className="form-error" style={{ marginBottom: '0.5rem' }}>{confirmError}</p>}
        <button type="button" className="btn btn-primary" onClick={handleConfirm} disabled={confirming}>
          {confirming ? 'Confirming...' : 'Confirm booking'}
        </button>
      </div>
      <button type="button" className="btn btn-secondary" onClick={() => navigate('/baggage')}>
        Back
      </button>
      </div>
      </div>
    </>
  );
}
