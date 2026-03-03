import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/PageHeader';

export function MyBookingsPage() {
  const { isAuthenticated } = useAuth();
  const { bookingId, selectedFlight, passengers, selectedSeats } = useBooking();

  if (!isAuthenticated) {
    return (
      <>
        <PageHeader title="My Bookings" subtitle="View and manage your trips." />
        <div className="container content-page">
          <div className="content-section">
            <p className="content-lead">Log in to view your bookings and manage your trips.</p>
            <Link to="/" className="btn btn-primary btn-lg">Go to home to log in</Link>
          </div>
        </div>
      </>
    );
  }

  const hasCurrentBooking = bookingId && selectedFlight;

  return (
    <>
      <PageHeader
        title="My Bookings"
        subtitle="Your recent and upcoming bookings."
      />
      <div className="container content-page">
        {hasCurrentBooking ? (
          <div className="booking-card">
            <h2 className="booking-id">Booking ID: {bookingId}</h2>
            <p><strong>Flight:</strong> {selectedFlight.airline} {selectedFlight.flightNumber}</p>
            <p>{selectedFlight.origin} → {selectedFlight.destination}</p>
            <p><strong>Departure:</strong> {new Date(selectedFlight.departure).toLocaleString()}</p>
            <div className="booking-meta">
              {passengers?.length > 0 && (
                <div>
                  <strong>Passengers</strong>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem' }}>{passengers.map((p) => p.name).join(', ')}</p>
                </div>
              )}
              {selectedSeats && Object.keys(selectedSeats).length > 0 && (
                <div>
                  <strong>Seats</strong>
                  <p style={{ margin: '0.25rem 0 0', fontSize: '0.9rem' }}>{Object.entries(selectedSeats).map(([, seat]) => seat).join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="content-section">
            <p className="content-lead">You don’t have any bookings to show yet.</p>
            <p>Book a flight and it will appear here. Your most recent booking is also shown on the confirmation page.</p>
            <Link to="/search" className="btn btn-primary btn-lg">Search flights</Link>
          </div>
        )}
      </div>
    </>
  );
}
