import React from 'react';
import { Link } from 'react-router-dom';
import { SearchForm } from '../components/SearchForm';

export function LandingPage() {
  return (
    <div className="landing">
      <section className="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-content">
          <h1 className="hero-title">Fly with confidence</h1>
          <p className="hero-subtitle">
            Book domestic flights across India. Best prices, easy booking, and support when you need it.
          </p>
          <div className="hero-search">
            <SearchForm />
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="features-title">Why choose SkyBook</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✈️</div>
              <h3>Wide network</h3>
              <p>Flights to 10+ cities: Delhi, Mumbai, Bangalore, Chennai, Pune, and more.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Best prices</h3>
              <p>Compare airlines and times. No hidden fees—see the full price before you book.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎫</div>
              <h3>Simple booking</h3>
              <p>Pick your flight, add passengers, choose seats, and you’re done.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Secure & reliable</h3>
              <p>Your data is safe. Instant confirmation and booking ID for every trip.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <p className="cta-text">Ready to travel? Start your search above or go straight to results.</p>
          <Link to="/search" className="btn btn-primary btn-lg">
            Search flights
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/help">Help</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/privacy">Privacy</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Explore</h4>
              <ul>
                <li><Link to="/destinations">Destinations</Link></li>
                <li><Link to="/offers">Offers</Link></li>
                <li><Link to="/my-bookings">My Bookings</Link></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© SkyBook. Flight booking made simple.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
