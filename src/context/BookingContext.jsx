import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';

const BookingContext = createContext(null);

const initialState = {
  searchParams: null,
  selectedFlight: null,
  passengers: [],
  selectedSeats: {},
  baggageItems: [],
  bookingId: null,
};

function bookingReducer(state, action) {
  switch (action.type) {
    case 'SET_SEARCH_PARAMS':
      return { ...state, searchParams: action.payload };
    case 'SET_SELECTED_FLIGHT':
      return { ...state, selectedFlight: action.payload };
    case 'SET_PASSENGERS':
      return { ...state, passengers: action.payload };
    case 'SET_SELECTED_SEAT':
      return {
        ...state,
        selectedSeats: { ...state.selectedSeats, [action.payload.passengerId]: action.payload.seatId },
      };
    case 'SET_BAGGAGE':
      state.baggageItems = action.payload;
      return state;
    case 'SET_BOOKING_ID':
      return { ...state, bookingId: action.payload };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const setSearchParams = useCallback((params) => {
    dispatch({ type: 'SET_SEARCH_PARAMS', payload: params });
  }, []);

  const setSelectedFlight = useCallback((flight) => {
    dispatch({ type: 'SET_SELECTED_FLIGHT', payload: flight });
  }, []);

  const setPassengers = useCallback((passengers) => {
    dispatch({ type: 'SET_PASSENGERS', payload: passengers });
  }, []);

  const setSelectedSeat = useCallback((passengerId, seatId) => {
    dispatch({ type: 'SET_SELECTED_SEAT', payload: { passengerId, seatId } });
  }, []);

  const setBaggageItems = useCallback((items) => {
    dispatch({ type: 'SET_BAGGAGE', payload: items });
  }, []);

  const confirmBooking = useCallback(async () => {
    const { apiRequest } = await import('../api/client');
    const current = stateRef.current;
    const response = await apiRequest('api/bookings', {
      method: 'POST',
      body: JSON.stringify({
        flightId: current.selectedFlight?.id,
        passengers: current.passengers,
        selectedSeats: current.selectedSeats,
        baggageItems: current.baggageItems,
      }),
    });
    const id = response.bookingId;
    dispatch({ type: 'SET_BOOKING_ID', payload: id });
    return id;
  }, []);

  const resetBooking = useCallback(() => {
    dispatch({ type: 'RESET_BOOKING' });
  }, []);

  const value = {
    ...state,
    setSearchParams,
    setSelectedFlight,
    setPassengers,
    setSelectedSeat,
    setBaggageItems,
    confirmBooking,
    resetBooking,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within BookingProvider');
  }
  return context;
}

export default BookingContext;
