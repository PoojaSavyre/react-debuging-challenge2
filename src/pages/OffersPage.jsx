import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';

const OFFERS = [
  {
    id: 1,
    title: 'First booking discount',
    description: 'Get 10% off your first flight when you book with SkyBook. Apply at checkout.',
    code: 'SKY10',
    valid: 'Valid for new users only.',
  },
  {
    id: 2,
    title: 'Weekend getaway',
    description: 'Special fares on select weekend routes. Delhi–Mumbai, Bangalore–Goa, and more.',
    code: null,
    valid: 'Fri–Sun travel. Subject to availability.',
  },
  {
    id: 3,
    title: 'No hidden fees',
    description: 'We show the full price upfront. No surprise charges at checkout.',
    code: null,
    valid: 'Always.',
  },
];

export function OffersPage() {
  return (
    <>
      <PageHeader
        title="Offers & deals"
        subtitle="Current promotions and benefits when you book with SkyBook."
      />
      <div className="container content-page">
        <div className="offers-list">
          {OFFERS.map((offer) => (
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
