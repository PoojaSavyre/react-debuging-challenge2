import React from 'react';
import { Link } from 'react-router-dom';

export function PageFallback({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="container">
      <div className="content-section card" style={{ margin: '2rem auto', maxWidth: '480px' }}>
        <h2>Something went wrong</h2>
        <p>{message}</p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-primary">
            Back to home
          </Link>
          {onRetry && (
            <button type="button" className="btn btn-secondary" onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div className="container">
      <div className="content-section" style={{ textAlign: 'center', padding: '3rem' }}>
        <p className="content-lead">Loading...</p>
      </div>
    </div>
  );
}
