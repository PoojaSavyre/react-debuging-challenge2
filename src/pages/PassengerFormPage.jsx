import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { useBooking } from '../context/BookingContext';
import { PageHeader } from '../components/PageHeader';

function PassengerFields({ passengerCount, register, errors }) {
  const fields = Array.from({ length: passengerCount }, (_, i) => i);
  return (
    <>
      {fields.map((i) => (
        <div key={i} className="card" style={{ marginBottom: '1rem' }}>
          <h3>Passenger {i + 1}</h3>
          <div className="form-group">
            <label htmlFor={`passengers.${i}.name`}>Full name *</label>
            <input
              id={`passengers.${i}.name`}
              {...register(`passengers.${i}.name`, { required: 'Name is required' })}
              aria-invalid={errors?.passengers?.[i]?.name ? 'true' : 'false'}
            />
            {errors?.passengers?.[i]?.name && (
              <span className="form-error" role="alert">
                {errors.passengers[i].name.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor={`passengers.${i}.email`}>Email *</label>
            <input
              id={`passengers.${i}.email`}
              type="email"
              {...register(`passengers.${i}.email`, {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Enter a valid email',
                },
              })}
              aria-invalid={errors?.passengers?.[i]?.email ? 'true' : 'false'}
            />
            {errors?.passengers?.[i]?.email && (
              <span className="form-error" role="alert">
                {errors.passengers[i].email.message}
              </span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor={`passengers.${i}.phone`}>Phone *</label>
            <input
              id={`passengers.${i}.phone`}
              type="tel"
              {...register(`passengers.${i}.phone`)}
            />
          </div>
        </div>
      ))}
    </>
  );
}

export function PassengerFormPage() {
  const navigate = useNavigate();
  const { selectedFlight, searchParams, setPassengers } = useBooking();
  const passengerCount = Math.min(9, Math.max(1, Number(searchParams?.passengers) || 1));

  const defaultValues = React.useMemo(
    () => ({
      passengers: Array.from({ length: passengerCount }, (_, i) => ({
        id: `p-${i}`,
        name: '',
        email: '',
        phone: '',
      })),
    }),
    [passengerCount]
  );

  const methods = useForm({
    defaultValues,
    mode: 'onSubmit',
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = methods;

  useEffect(() => {
    if (!selectedFlight) {
        navigate('/search', { replace: true });
    }
  }, [selectedFlight, navigate]);

  useEffect(() => {
    reset(defaultValues);
  }, [passengerCount, reset]);

  const onSubmit = (data) => {
    const passengers = (data.passengers || []).map((p, i) => ({
      id: defaultValues.passengers[i]?.id || `p-${i}`,
      name: p.name?.trim() ?? '',
      email: p.email?.trim() ?? '',
      phone: p.phone?.trim() ?? '',
    }));
    setPassengers(passengers);
    navigate('/seats');
  };

  if (!selectedFlight) return null;

  return (
    <>
      <PageHeader
        title="Passenger details"
        subtitle={`${passengerCount} passenger(s) · ${selectedFlight?.airline} ${selectedFlight?.flightNumber}`}
      />
      <div className="container">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="content-section" data-testid="passenger-form">
            <PassengerFields
              passengerCount={passengerCount}
              register={register}
              errors={errors}
            />
            <button type="submit" className="btn btn-primary">
              Continue to seat selection
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}
