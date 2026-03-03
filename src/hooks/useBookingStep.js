import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

const BOOKING_STEPS = ['flight', 'passengers', 'seats', 'baggage', 'review'];

/**
 * Custom hook for booking flow: validates that required data exists for the current step
 * and redirects to the correct step if the user landed on an invalid URL.
 */
export function useBookingStep(stepName, requiredFromBooking) {
  const navigate = useNavigate();
  const booking = useBooking();
  const { selectedFlight, passengers, searchParams } = booking;

  const stepIndex = BOOKING_STEPS.indexOf(stepName);
  const hasFlight = !!selectedFlight;
  const hasPassengers = Array.isArray(passengers) && passengers.length > 0;
  const hasSearchParams = !!(searchParams?.origin && searchParams?.destination);

  useEffect(() => {
    if (!requiredFromBooking) return;
    if (stepName === 'passengers' && !hasFlight) {
      navigate('/search', { replace: true });
      return;
    }
    if (stepName === 'seats' && (!hasFlight || !hasPassengers)) {
      navigate(hasFlight ? '/passengers' : '/search', { replace: true });
      return;
    }
    if (stepName === 'baggage' && (!hasFlight || !hasPassengers)) {
      navigate(hasFlight ? '/passengers' : '/search', { replace: true });
      return;
    }
    if (stepName === 'review' && (!hasFlight || !hasPassengers)) {
      navigate(hasFlight ? '/passengers' : '/search', { replace: true });
      return;
    }
  }, [stepName, hasFlight, hasPassengers, hasSearchParams, navigate, requiredFromBooking]);

  const canProceed = {
    passengers: hasFlight,
    seats: hasFlight && hasPassengers,
    baggage: hasFlight && hasPassengers,
    review: hasFlight && hasPassengers,
  }[stepName] ?? true;

  return {
    ...booking,
    stepIndex,
    canProceed,
    hasFlight,
    hasPassengers,
  };
}
