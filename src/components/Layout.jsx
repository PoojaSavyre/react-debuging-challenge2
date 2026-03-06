import React, { useState, useEffect } from 'react';
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
            <Link to="/offers">Offers</Link>
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
              <button type="button" className="btn btn-primary nav-login-btn" onClick={() => setShowLoginModal(true)} data-testid="nav-login-btn">
                Log in
              </button>
            )}
          </div>
        </div>
      </nav>
      {showLoginModal && (
        <LoginModal
          onClose={handleCloseLoginModal}
          onLoginSuccess={
            redirectTo
              ? () => {
                  setShowLoginModal(false);
                  navigate(redirectTo, { replace: true });
                }
              : undefined
          }
        />
      )}
      <main>{children}</main>
    </>
  );
}
