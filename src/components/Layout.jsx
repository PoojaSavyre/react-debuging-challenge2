import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';

export function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo;

  useEffect(() => {
    if (redirectTo && !isAuthenticated) {
      setShowLoginModal(true);
    }
  }, [redirectTo, isAuthenticated]);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    if (redirectTo) {
      navigate('/', { replace: true, state: {} });
    }
  };

  // Memoized to avoid LoginModal re-renders; redirectTo/navigate are stable enough for this callback.
  const onLoginSuccess = useCallback(() => {
    setShowLoginModal(false);
    if (redirectTo) {
      navigate(redirectTo, { replace: true });
    }
  }, []);

  return (
    <>
      <nav className="nav">
        <div className="nav-inner">
          <div>
            <Link to="/" className="nav-logo">SkyBook</Link>
            <Link to="/search">Search</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/help">Help</Link>
            <Link to="/destinations">Destinations</Link>
            <Link to="/my-bookings">My Bookings</Link>
          </div>
          <div className="nav-right">
            {isAuthenticated ? (
              <>
                <span className="user-name">{user?.name || user?.email}</span>
                <button type="button" className="btn btn-secondary" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <button type="button" className="btn btn-primary nav-login-btn" onClick={() => setShowLoginModal(true)}>
                Log in
              </button>
            )}
          </div>
        </div>
      </nav>
      {showLoginModal && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={redirectTo ? onLoginSuccess : undefined}
        />
      )}
      <main>{children}</main>
    </>
  );
}
