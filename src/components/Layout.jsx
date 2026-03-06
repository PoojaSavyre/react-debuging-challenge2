import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoginModal } from './LoginModal';

export function Layout({ children }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = location.state?.redirectTo;
  const redirectToRef = useRef(undefined);
  const [, setRedirectToReady] = useState(false);

  useEffect(() => {
    if (!redirectTo) {
      redirectToRef.current = undefined;
      return;
    }
    if (!isAuthenticated) {
      setShowLoginModal(true);
      // Defer setting ref so first modal render gets onLoginSuccess undefined; next render would pass correct callback (modal memo prevents update)
      setTimeout(() => {
        redirectToRef.current = redirectTo;
        setRedirectToReady((r) => !r);
      }, 0);
    }
  }, [redirectTo, isAuthenticated]);

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
    if (redirectTo) {
      navigate('/', { replace: true, state: {} });
    }
  };

  const onLoginSuccess = redirectToRef.current
    ? () => {
        setShowLoginModal(false);
        navigate(redirectToRef.current, { replace: true });
      }
    : undefined;

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
          onLoginSuccess={onLoginSuccess}
        />
      )}
      <main>{children}</main>
    </>
  );
}
