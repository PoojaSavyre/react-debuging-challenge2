import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';

export function TermsPage() {
  return (
    <>
      <PageHeader
        title="Terms & Conditions"
        subtitle="Please read these terms before using SkyBook. Last updated: March 2025."
      />
      <div className="container content-page">
        <div className="content-section">
          <h2>1. Use of service</h2>
          <p>By using SkyBook you agree to these terms. You must be at least 18 years old to make a booking. You are responsible for providing accurate passenger and contact details.</p>
          <h2>2. Bookings and payment</h2>
          <p>Fares and availability are subject to change until payment is confirmed. We display total prices inclusive of applicable taxes where required. You agree to pay the amount shown at the time of confirmation.</p>
          <h2>3. Changes and cancellations</h2>
          <p>Cancellation and change rules depend on the fare and airline. Contact our support team with your booking ID to request changes or cancellations. Refunds, if applicable, will be processed as per the fare rules.</p>
          <h2>4. Liability</h2>
          <p>SkyBook acts as a booking platform. Flight operations are the responsibility of the operating airline. We are not liable for delays, cancellations, or other issues arising from airline or airport operations.</p>
          <h2>5. Contact</h2>
          <p>For questions about these terms, visit our <Link to="/contact">Contact</Link> page.</p>
        </div>
      </div>
    </>
  );
}
