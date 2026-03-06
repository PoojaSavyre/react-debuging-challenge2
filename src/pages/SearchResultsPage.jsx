import React, { useCallback } from 'react';
import { useBooking } from '../context/BookingContext';
import { useFlightsSearch } from '../hooks/useFlightsSearch';
import { FlightCard } from '../components/FlightCard';
import { SearchForm } from '../components/SearchForm';
import { PageHeader } from '../components/PageHeader';

export function SearchResultsPage() {
  const { searchParams } = useBooking();
  const { loading, sortBy, setSortBy, sortedFlights } = useFlightsSearch(searchParams);

  const handleSortChange = useCallback(
    (e) => {
      setSortBy(e.target.value);
    },
    [setSortBy]
  );

  if (!searchParams?.origin || !searchParams?.destination) {
    return (
      <>
        <PageHeader
          title="Search flights"
          subtitle="Enter your trip details to find and compare flights."
        />
        <div className="container page-search-form">
          <div className="content-section" style={{ maxWidth: '560px' }}>
            <SearchForm />
          </div>
        </div>
      </>
    );
  }

  if (loading && !sortedFlights?.length) {
    return (
      <>
        <PageHeader
          title="Searching..."
          subtitle={`Flights from ${searchParams.origin} to ${searchParams.destination}`}
        />
        <div className="container">
          <div className="content-section" style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="content-lead">Loading flights...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title={`${searchParams.origin} → ${searchParams.destination}`}
        subtitle={
          sortedFlights.length
            ? `${sortedFlights.length} flight(s) found`
            : 'No flights on this route'
        }
      />
      <div className="container" data-testid="search-results-page">
        {sortedFlights.length > 0 && (
          <div className="results-header">
            <h2 className="results-title">Choose a flight</h2>
            <div className="form-group results-sort">
              <label htmlFor="sort">Sort by</label>
              <select id="sort" value={sortBy} onChange={handleSortChange}>
                <option value="departure">Departure time</option>
                <option value="price">Price</option>
              </select>
            </div>
          </div>
        )}
        {sortedFlights.length === 0 ? (
          <div className="content-section">
            <p className="content-lead">
              No flights found for this route. Try different cities or dates.
            </p>
          </div>
        ) : (
          sortedFlights.map((flight) => <FlightCard key={flight.id} flight={flight} />)
        )}
      </div>
    </>
  );
}
