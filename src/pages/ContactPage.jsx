import React from 'react';
import { PageHeader } from '../components/PageHeader';

export function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact us"
        subtitle="Have a question or need help? We’re here to assist you."
      />
      <div className="container content-page">
        <div className="content-section">
          <p className="content-lead">
            Reach out for booking support, changes, or general enquiries. Have your booking ID ready for faster help.
          </p>
          <h2>Customer support</h2>
          <div className="contact-row">
            <div className="contact-item">
              <strong>Email</strong>
              <span>support@skybook.com</span>
            </div>
            <div className="contact-item">
              <strong>Phone (toll-free)</strong>
              <span>+91 1800-123-4567</span>
            </div>
            <div className="contact-item">
              <strong>Hours</strong>
              <span>Mon–Sat, 9:00 AM – 6:00 PM IST</span>
            </div>
          </div>
          <h2>Bookings & changes</h2>
          <p>
            Use the same email or phone above. Provide your booking ID so we can help you quickly.
          </p>
        </div>
      </div>
    </>
  );
}
