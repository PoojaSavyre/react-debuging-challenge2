import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function ModalFormSection({ children }) {
  return <div className="modal-form-section" />;
}

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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="login-modal-title" data-testid="login-modal">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 id="login-modal-title" className="login-title">Log in</h2>
        <p className="login-desc">Sign in to complete booking (passengers, seats, review).</p>
        <p className="login-instruction" style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem', marginBottom: '1rem' }}>
          Use <strong>john</strong> as name and <strong>john@gmail.com</strong> as email.
        </p>
        <ModalFormSection>
        <form onSubmit={handleSubmit} className="login-form" data-testid="login-form">
          {loginError && (
            <p className="form-error" style={{ marginBottom: '0.5rem' }}>{loginError}</p>
          )}
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
            <button type="submit" className="btn btn-primary" disabled={loginSubmitting} data-testid="login-submit-btn">
              {loginSubmitting ? 'Logging in...' : 'Log in'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
        </ModalFormSection>
      </div>
    </div>
  );
}
