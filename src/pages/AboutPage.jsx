import React from 'react';
import { PageHeader } from '../components/PageHeader';

export function AboutPage() {
  return (
    <>
      <PageHeader
        title="About SkyBook"
        subtitle="Your trusted partner for domestic flight booking across India."
      />
      <div className="container content-page">
        <div className="content-section">
          <p className="content-lead">
            SkyBook makes it simple to find the best fares, choose your seats, and travel with confidence. We focus on clarity and reliability so you can focus on your journey.
          </p>
          <h2>Our mission</h2>
          <p>
            We believe everyone deserves a smooth, transparent booking experience. No hidden fees, no surprises—just clear prices and reliable service.
          </p>
          <h2>What we offer</h2>
          <ul className="content-list">
            <li>Flights to 10+ cities: Delhi, Mumbai, Bangalore, Chennai, Pune, Kolkata, Hyderabad, Kochi, Goa, and Ahmedabad</li>
            <li>Compare multiple airlines and times in one place</li>
            <li>Easy seat selection and baggage options</li>
            <li>Instant confirmation and booking ID for every trip</li>
          </ul>
          <p>
            Thank you for choosing SkyBook. We’re here to help you fly with confidence.
          </p>
        </div>
      </div>
    </>
  );
}
