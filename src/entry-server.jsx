import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { store } from './store';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { PageFallback } from './components/PageFallback';
import { useAuth } from './context/AuthContext';
import { LandingPage } from './pages/LandingPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { FlightDetailPage } from './pages/FlightDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HelpPage } from './pages/HelpPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { OffersPage } from './pages/OffersPage';
import { MyBookingsPage } from './pages/MyBookingsPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { PassengerFormPage } from './pages/PassengerFormPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { BaggagePage } from './pages/BaggagePage';
import { ReviewPage } from './pages/ReviewPage';

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ redirectTo: location.pathname }} replace />;
  }
  return children;
}

function BookingSectionFallback() {
  return (
    <PageFallback
      message="There was a problem loading this step. You can go back home or try again."
      onRetry={() => window.location.reload()}
    />
  );
}

function AppSSR() {
  return (
    <ErrorBoundary
      fallback={
        <Layout>
          <PageFallback onRetry={() => window.location.reload()} />
        </Layout>
      }
    >
      <Layout>
        <ErrorBoundary fallback={<BookingSectionFallback />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            <Route path="/flight/:flightId" element={<FlightDetailPage />} />
            <Route
              path="/passengers"
              element={
                <PrivateRoute>
                  <PassengerFormPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/seats"
              element={
                <PrivateRoute>
                  <SeatSelectionPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/baggage"
              element={
                <PrivateRoute>
                  <BaggagePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/review"
              element={
                <PrivateRoute>
                  <ReviewPage />
                </PrivateRoute>
              }
            />
            <Route path="/confirmation" element={<ConfirmationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/my-bookings" element={<MyBookingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
}

export function render(url) {
  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <AuthProvider>
          <BookingProvider>
            <AppSSR />
          </BookingProvider>
        </AuthProvider>
      </StaticRouter>
    </Provider>
  );
  return html;
}
