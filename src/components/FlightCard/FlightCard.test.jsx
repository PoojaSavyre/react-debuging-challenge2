import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FlightCard } from './FlightCard';

const flight = {
  id: 'FL-101',
  airline: 'SkyWings',
  flightNumber: 'SW101',
  origin: 'DEL',
  destination: 'BOM',
  departure: '2025-03-15T08:00:00',
  arrival: '2025-03-15T10:15:00',
  duration: 135,
  price: 4500,
  seatsAvailable: 12,
};

describe('FlightCard', () => {
  it('renders flight info', () => {
    render(
      <BrowserRouter>
        <FlightCard flight={flight} />
      </BrowserRouter>
    );
    expect(screen.getByText(/SkyWings/)).toBeInTheDocument();
    expect(screen.getByText(/SW101/)).toBeInTheDocument();
    expect(screen.getByText(/₹4,500/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /select/i })).toHaveAttribute('href', '/flight/FL-101');
  });

  it('renders with different flight props', () => {
    const other = { ...flight, id: 'FL-102', airline: 'JetFast', price: 5200 };
    render(
      <BrowserRouter>
        <FlightCard flight={other} />
      </BrowserRouter>
    );
    expect(screen.getByText(/JetFast/)).toBeInTheDocument();
    expect(screen.getByText(/₹5,200/)).toBeInTheDocument();
  });
});
