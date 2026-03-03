import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { SearchForm } from '../components/SearchForm';

export function HomePage() {
  const { isAuthenticated, login, authLoading } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginName, setLoginName] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginSubmitting, setLoginSubmitting] = useState(false);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail || !loginName) return;
    setLoginSubmitting(true);
    try {
      await login(loginEmail, loginName);
      setShowLogin(false);
      setLoginEmail('');
      setLoginName('');
    } catch (err) {
      setLoginError(err.body?.error || err.message || 'Login failed');
    } finally {
      setLoginSubmitting(false);
    }
  };

  return (
    <div className="container">
      <h1 className="page-title">Book your flight</h1>
      {authLoading ? (
        <div className="card" style={{ marginBottom: '1rem' }}>Loading...</div>
      ) : !isAuthenticated ? (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <p style={{ marginBottom: '0.5rem' }}>
            Log in to continue with booking (passengers, seats, review).
          </p>
          {!showLogin ? (
            <button type="button" className="btn btn-primary" onClick={() => setShowLogin(true)}>
              Log in
            </button>
          ) : (
            <form onSubmit={handleLoginSubmit}>
              {loginError && (
                <p className="form-error" style={{ marginBottom: '0.5rem' }}>{loginError}</p>
              )}
              <div className="form-group">
                <label htmlFor="login-name">Name</label>
                <input
                  id="login-name"
                  type="text"
                  value={loginName}
                  onChange={(e) => setLoginName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="login-email">Email</label>
                <input
                  id="login-email"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={loginSubmitting}>
                {loginSubmitting ? 'Logging in...' : 'Log in'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ marginLeft: '0.5rem' }}
                onClick={() => { setShowLogin(false); setLoginError(''); }}
              >
                Cancel
              </button>
            </form>
          )}
        </div>
      ) : null}
      <SearchForm />
    </div>
  );
}
