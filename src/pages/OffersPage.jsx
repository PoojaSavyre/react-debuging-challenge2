import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';
import { useOffers } from '../context/PreloadContext';

export function OffersPage() {
  const { offers, loading } = useOffers();

  if (loading) {
    return (
      <>
        <PageHeader
          title="Offers & deals"
          subtitle="Current promotions and benefits when you book with SkyBook."
        />
        <div className="container content-page">
          <div className="content-section" style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="content-lead">Loading offers...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Offers & deals"
        subtitle="Current promotions and benefits when you book with SkyBook."
      />
      <div className="container content-page">
        <div className="offers-list">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`offer-card card card-elevated ${offer.code ? 'has-code' : ''}`}
            >
              {offer.code && <span className="offer-badge">Deal</span>}
              <h3 className="offer-title">{offer.title}</h3>
              <p className="offer-desc">{offer.description}</p>
              {offer.code && (
                <p className="offer-code">Use code: <strong>{offer.code}</strong></p>
              )}
              <p className="offer-valid">{offer.valid}</p>
            </div>
          ))}
        </div>
        <Link to="/search" className="btn btn-primary btn-lg">
          Search flights
        </Link>
      </div>
    </>
  );
}
