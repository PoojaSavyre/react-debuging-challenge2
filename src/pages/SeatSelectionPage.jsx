import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { SeatMap } from '../components/SeatMap';
import { PageHeader } from '../components/PageHeader';

const OCCUPIED = ['A2', 'B3', 'C1', 'D4', 'E2', 'F5'];

export function SeatSelectionPage() {
  const navigate = useNavigate();
  const { passengers, selectedSeats, setSelectedSeat } = useBooking();
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);
  const currentPassenger = passengers[currentPassengerIndex];
  const currentSeat = currentPassenger ? selectedSeats[currentPassenger.id] : null;

  useEffect(() => {
    if (!passengers?.length) {
      navigate('/passengers', { replace: true });
    }
  }, [passengers, navigate]);

  const handleSelectSeat = (seatId) => {
    if (!currentPassenger) return;
    setSelectedSeat(currentPassenger.id, seatId);
  };

  const handleNext = () => {
    if (currentPassengerIndex < passengers.length - 1) {
      setCurrentPassengerIndex((i) => i + 1);
    } else {
      navigate('/baggage');
    }
  };

  const handleBack = () => {
    if (currentPassengerIndex > 0) {
      setCurrentPassengerIndex((i) => i - 1);
    } else {
      navigate('/passengers');
    }
  };

  if (!passengers?.length) {
    return null;
  }

  return (
    <>
      <PageHeader
        title="Select seats"
        subtitle={currentPassenger ? `Passenger ${currentPassengerIndex + 1} of ${passengers.length}: ${currentPassenger.name}` : 'Choose your seat'}
      />
      <div className="container">
        <div className="content-section">
      <p>
        Passenger {currentPassengerIndex + 1} of {passengers.length}: {currentPassenger?.name}
      </p>
      <div className="card">
        <SeatMap
          selectedSeatId={currentSeat}
          occupiedSeatIds={OCCUPIED}
          onSelectSeat={handleSelectSeat}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginLeft: '0.5rem' }}
          onClick={handleNext}
          disabled={!currentSeat && currentPassengerIndex === passengers.length - 1}
        >
          {currentPassengerIndex < passengers.length - 1 ? 'Next passenger' : 'Continue to baggage'}
        </button>
      </div>
        </div>
      </div>
    </>
  );
}
