import React from 'react';
import { PageHeader } from '../components/PageHeader';

const FAQ = [
  {
    q: 'How do I search for flights?',
    a: 'On the home page or Search page, choose your origin and destination from the dropdowns, pick a date, set the number of passengers, and click "Search Flights". You’ll see available flights with prices and times.',
  },
  {
    q: 'Do I need to log in to search?',
    a: 'No. You can search and view flights as a guest. You’ll need to log in when you’re ready to enter passenger details, select seats, and complete the booking.',
  },
  {
    q: 'How do I complete a booking?',
    a: 'After searching, select a flight, then follow the steps: enter passenger details, choose seats, add baggage (optional), review your trip, and confirm. You’ll receive a booking ID on the confirmation page.',
  },
  {
    q: 'Can I change or cancel my booking?',
    a: 'For changes or cancellations, please contact our support team with your booking ID. Use the details on the Contact page.',
  },
  {
    q: 'What baggage can I add?',
    a: 'On the baggage step you can add carry-on and checked baggage options. Limits and fees depend on the option you choose. Details are shown when you select each option.',
  },
  {
    q: 'Which cities do you serve?',
    a: 'We serve 10+ cities including Delhi, Mumbai, Bangalore, Chennai, Kolkata, Pune, Hyderabad, Kochi, Goa, and Ahmedabad. See the Destinations page for the full list.',
  },
];

export function HelpPage() {
  return (
    <>
      <PageHeader
        title="Help & FAQ"
        subtitle="Common questions about searching, booking, and travelling with SkyBook."
      />
      <div className="container content-page">
        <div className="content-section">
          {FAQ.map((item, i) => (
            <div key={i} className="faq-item">
              <h3 className="faq-q">{item.q}</h3>
              <p className="faq-a">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
