import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useForm, useFormContext, Controller, FormProvider  } from 'react-hook-form';
import { useBooking } from '../../context/BookingContext';
import { SearchFormField } from './SearchFormField';
import { AIRPORTS } from '../../data/airports';

function SearchFormFields() {
  const { control, watch, formState: { errors } } = useFormContext();
  const origin = watch('origin');
  const originOptions = useMemo(
    () => AIRPORTS.map((a) => ({ value: a.code, label: `${a.code} - ${a.city}` })),
    []
  );
  const destinationOptions = useMemo(
    () =>
      origin
        ? AIRPORTS.filter((a) => a.code !== origin).map((a) => ({
            value: a.code,
            label: `${a.code} - ${a.city}`,
          }))
        : AIRPORTS.map((a) => ({ value: a.code, label: `${a.code} - ${a.city}` })),
    [origin]
  );

  return (
    <>
      <Controller
        name="origin"
        control={control}
        rules={{
          required: 'Origin is required',
          validate: (v, form) =>
            form.destination && v === form.destination ? 'Origin and destination must differ' : true,
        }}
        render={({ field }) => (
          <SearchFormField
            label="From"
            name="origin"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            error={errors.origin?.message}
            placeholder="Select origin"
            required
            options={originOptions}
          />
        )}
      />
      <Controller
        name="destination"
        control={control}
        rules={{
          required: 'Destination is required',
          validate: (v, form) =>
            form.origin && v === form.origin ? 'Origin and destination must differ' : true,
        }}
        render={({ field }) => (
          <SearchFormField
            label="To"
            name="destination"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            error={errors.destination?.message}
            placeholder="Select destination"
            required
            options={destinationOptions}
          />
        )}
      />
      <Controller
        name="date"
        control={control}
        rules={{ required: 'Date is required' }}
        render={({ field }) => (
          <SearchFormField
            label="Date"
            name="date"
            type="date"
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
            error={errors.date?.message}
            required
          />
        )}
      />
      <Controller
        name="passengers"
        control={control}
        rules={{
          required: 'Required',
          min: { value: 1, message: 'Passengers must be 1-9' },
          max: { value: 9, message: 'Passengers must be 1-9' },
        }}
        render={({ field }) => (
          <SearchFormField
            label="Passengers"
            name="passengers"
            type="number"
            min={1}
            max={9}
            value={field.value}
            onChange={(e) => field.onChange(parseInt(e.target.value, 10) || 1)}
            error={errors.passengers?.message}
          />
        )}
      />
    </>
  );
}

export function SearchForm({ onSubmit }) {
  const navigate = useNavigate();
  const { setSearchParams } = useBooking();
  const methods = useForm({
    defaultValues: {
      origin: '',
      destination: '',
      date: '',
      passengers: 1,
    },
    mode: 'onSubmit',
  });

  const onSubmitForm = (data) => {
    setSearchParams(data);
    if (onSubmit) onSubmit(data);
    else navigate('/search');
  };

  return (
    <form onSubmit={methods.handleSubmit(onSubmitForm)} className="card" role="search" aria-label="Flight search">
      <SearchFormFields />
      <button type="submit" className="btn btn-primary">
        Search Flights
      </button>
    </form>
  );
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
};
