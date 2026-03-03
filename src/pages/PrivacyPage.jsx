import React from 'react';
import { Link } from 'react-router-dom';
import { PageHeader } from '../components/PageHeader';

export function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subtitle="How SkyBook handles your information. Last updated: March 2025."
      />
      <div className="container content-page">
        <div className="content-section">
          <h2>1. Information we collect</h2>
          <p>When you search or book, we collect your name, email, phone (if provided), and travel details (origin, destination, dates, passengers, seats, baggage). We also store a session token when you log in.</p>
          <h2>2. How we use it</h2>
          <p>We use this information to process your booking, send confirmation, and provide customer support. We do not sell your personal data to third parties for marketing.</p>
          <h2>3. Data storage and security</h2>
          <p>Booking and account data are stored securely. We use industry-standard measures to protect your information. Session tokens are used only to identify you during your visit.</p>
          <h2>4. Your rights</h2>
          <p>You may request access to or correction of your data by contacting us. You can log out at any time to clear your session from this device.</p>
          <h2>5. Contact</h2>
          <p>For privacy-related questions, visit our <Link to="/contact">Contact</Link> page.</p>
        </div>
      </div>
    </>
  );
}
