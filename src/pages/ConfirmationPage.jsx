import React from 'react';
import { Link } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/PageHeader';

export function ConfirmationPage() {
  const { bookingId, selectedFlight, resetBooking } = useBooking();

  const handleNewBooking = () => {
    resetBooking();
  };

  return (
    <>
      <PageHeader
        title="Booking confirmed"
        subtitle="Thank you for flying with SkyBook."
      />
      <div className="container">
        <div className="content-section confirmation-card">
          <p className="confirmation-message">Thank you for your booking!</p>
          <p><strong>Booking ID:</strong> <span className="booking-id-inline">{bookingId}</span></p>
          {selectedFlight && (
            <p className="flight-summary">
              {selectedFlight.airline} {selectedFlight.flightNumber} – {selectedFlight.origin} → {selectedFlight.destination}
            </p>
          )}
          <Link to="/" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem', display: 'inline-block' }} onClick={handleNewBooking}>
            Book another flight
          </Link>
        </div>
      </div>
    </>
  );
}
