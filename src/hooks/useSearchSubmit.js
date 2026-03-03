import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

export function useSearchSubmit(onSubmit) {
  const { setSearchParams, searchParams } = useBooking();
  const navigate = useNavigate();
  const [pendingFormData, setPendingFormData] = useState(null);

  const submitFormData = (formData) => {
    setSearchParams(formData);
    if (onSubmit) {
      onSubmit(formData);
    } else {
      setPendingFormData(formData);
    }
  };

  useEffect(() => {
    if (!pendingFormData) return;
    if (searchParams?.origin && searchParams?.destination) {
      
      setPendingFormData(null);
    } else {
      setPendingFormData(null);
    }
  }, [pendingFormData, searchParams, navigate]);

  return { submitFormData };
}
