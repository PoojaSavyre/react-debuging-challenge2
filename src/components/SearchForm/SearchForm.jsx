import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { SearchFormField } from './SearchFormField';
import { AIRPORTS } from '../../data/airports';

export function SearchForm({ onSubmit }) {
  const navigate = useNavigate();
  const { setSearchParams } = useBooking();
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    date: '',
    passengers: 1,
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.origin.trim()) newErrors.origin = 'Origin is required';
    if (!formData.destination.trim()) newErrors.destination = 'Destination is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (formData.passengers < 1 || formData.passengers > 9) {
      newErrors.passengers = 'Passengers must be 1-9';
    }
    if (formData.origin === formData.destination && formData.origin) {
      newErrors.destination = 'Origin and destination must differ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSearchParams(formData);
    if (onSubmit) onSubmit(formData);
    else navigate('/search');
  };

  const handleChange = (name, value) => {
    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      if (name === 'origin' && prev.destination === value) next.destination = '';
      return next;
    });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const originOptions = useMemo(
    () => AIRPORTS.map((a) => ({ value: a.code, label: `${a.code} - ${a.city}` })),
    []
  );
  const destinationOptions = useMemo(
    () =>
      formData.origin
        ? AIRPORTS.filter((a) => a.code !== formData.origin).map((a) => ({
            value: a.code,
            label: `${a.code} - ${a.city}`,
          }))
        : AIRPORTS.map((a) => ({ value: a.code, label: `${a.code} - ${a.city}` })),
    [formData.origin]
  );

  return (
    <form onSubmit={handleSubmit} className="card" role="search" aria-label="Flight search" data-testid="search-form" noValidate>
      <SearchFormField
        label="From"
        name="origin"
        value={formData.origin}
        onChange={(e) => handleChange('origin', e.target.value)}
        error={errors.origin}
        placeholder="Select origin"
        required
        options={originOptions}
      />
      <SearchFormField
        label="To"
        name="destination"
        value={formData.destination}
        onChange={(e) => handleChange('destination', e.target.value)}
        error={errors.destination}
        placeholder="Select destination"
        required
        options={destinationOptions}
      />
      <SearchFormField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={(e) => handleChange('date', e.target.value)}
        error={errors.date}
        required
      />
      <SearchFormField
        label="Passengers"
        name="passengers"
        type="number"
        min={1}
        max={9}
        value={formData.passengers}
        onChange={(e) => handleChange('passengers', parseInt(e.target.value, 10) || 1)}
        error={errors.passengers}
      />
      <button type="submit" className="btn btn-primary">
        Search Flights
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
