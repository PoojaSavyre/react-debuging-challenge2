import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export function LoginModal({ onClose, onLoginSuccess }) {
  const { login } = useAuth();
  const [loginName, setLoginName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginName) return;
    setLoginSubmitting(true);
    try {
      await login(loginEmail, loginName);
      setLoginName('');
      setLoginEmail('');
      if (onLoginSuccess) {
        onLoginSuccess();
      } else {
        onClose();
      }
    } catch (err) {
      setLoginError(err.body?.error || err.message || 'Login failed');
    } finally {
      setLoginSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="login-modal-title" className="login-title">Log in</h2>
        <p className="login-desc">Sign in to complete booking (passengers, seats, review).</p>
        <form onSubmit={handleSubmit} className="login-form">
          {loginError && (
            <p className="form-error" style={{ marginBottom: '0.5rem' }}>{loginError}</p>
          )}
          <p className="login-hint" style={{ marginBottom: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted, #64748b)' }}>
            Use john as name and john@gmail.com as email.
          </p>
          <div className="form-group">
            <label htmlFor="modal-login-name">Name</label>
            <input
              id="modal-login-name"
              type="text"
              value={loginName}
              onChange={(e) => setLoginName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="modal-login-email">Email</label>
            <input
              id="modal-login-email"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>
          <div className="login-actions">
            <button type="submit" className="btn btn-primary" disabled={loginSubmitting}>
              {loginSubmitting ? 'Logging in...' : 'Log in'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
