import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { AIRPORTS } from '../data/airports';

export function DestinationsPage() {
  return (
    <>
      <PageHeader
        title="Destinations"
        subtitle="We fly to major cities across India. Choose a city and search for flights."
      />
      <div className="container content-page">
        <div className="destinations-grid">
          {AIRPORTS.map((airport) => (
            <Link
              key={airport.code}
              to="/search"
              className="destination-card"
            >
              <span className="destination-icon" aria-hidden="true">✈️</span>
              <span className="destination-code">{airport.code}</span>
              <span className="destination-city">{airport.city}</span>
            </Link>
          ))}
        </div>
        <p className="content-muted">
          Use the Search page to choose your origin and destination and view available flights.
        </p>
      </div>
    </>
  );
}
