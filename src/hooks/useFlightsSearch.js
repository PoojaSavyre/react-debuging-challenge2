import { useEffect, useMemo, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { apiRequest } from '../api/client';

/**
 * Custom hook for flight search: fetches flights when origin/destination change,
 * with proper cleanup and no state updates after unmount.
 */
export function useFlightsSearch(searchParams) {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights);
  const loading = useSelector((state) => state.loading);
  const sortBy = useSelector((state) => state.sortBy);
  const cancelledRef = useRef(false);

  useEffect(() => {
    if (!searchParams?.origin || !searchParams?.destination) return;
    cancelledRef.current = false;
    dispatch({ type: 'SET_LOADING', payload: true });

    const origin = encodeURIComponent(searchParams.origin.toUpperCase());
    const destination = encodeURIComponent(searchParams.destination.toUpperCase());

    apiRequest(`api/flights?origin=${origin}&destination=${destination}`)
      .then((list) => {
        if (!cancelledRef.current) {
          dispatch({ type: 'SET_FLIGHTS', payload: list });
        }
      })
      .catch(() => {
        if (!cancelledRef.current) {
          dispatch({ type: 'SET_FLIGHTS', payload: [] });
        }
      })
      .finally(() => {
        if (!cancelledRef.current) {
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      });

    return () => {
      cancelledRef.current = true;
    };
  }, [searchParams?.origin, searchParams?.destination, dispatch]);

  const setSortBy = useCallback(
    (value) => {
      dispatch({ type: 'SET_SORT', payload: value });
    },
    [dispatch]
  );

  const sortedFlights = useMemo(() => {
    const list = flights || [];
    return [...list].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      return new Date(a.departure) - new Date(b.departure);
    });
  }, [flights, sortBy]);

  return {
    flights,
    loading,
    sortBy,
    setSortBy,
    sortedFlights,
  };
}
