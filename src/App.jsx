import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Layout } from './components/Layout';
import { PageFallback, LoadingFallback } from './components/PageFallback';
import { useAuth } from './context/AuthContext';

const LandingPage = lazy(() => import('./pages/LandingPage').then((m) => ({ default: m.LandingPage })));
const SearchResultsPage = lazy(() =>
  import('./pages/SearchResultsPage').then((m) => ({ default: m.SearchResultsPage }))
);
const FlightDetailPage = lazy(() =>
  import('./pages/FlightDetailPage').then((m) => ({ default: m.FlightDetailPage }))
);
const PassengerFormPage = lazy(() =>
  import('./pages/PassengerFormPage').then((m) => ({ default: m.PassengerFormPage }))
);
const SeatSelectionPage = lazy(() =>
  import('./pages/SeatSelectionPage').then((m) => ({ default: m.SeatSelectionPage }))
);
const BaggagePage = lazy(() => import('./pages/BaggagePage').then((m) => ({ default: m.BaggagePage })));
const ReviewPage = lazy(() => import('./pages/ReviewPage').then((m) => ({ default: m.ReviewPage })));
const ConfirmationPage = lazy(() =>
  import('./pages/ConfirmationPage').then((m) => ({ default: m.ConfirmationPage }))
);
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const HelpPage = lazy(() => import('./pages/HelpPage').then((m) => ({ default: m.HelpPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then((m) => ({ default: m.TermsPage })));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage').then((m) => ({ default: m.PrivacyPage })));
const DestinationsPage = lazy(() =>
  import('./pages/DestinationsPage').then((m) => ({ default: m.DestinationsPage }))
);
const OffersPage = lazy(() => import('./pages/OffersPage').then((m) => ({ default: m.OffersPage })));
const MyBookingsPage = lazy(() =>
  import('./pages/MyBookingsPage').then((m) => ({ default: m.MyBookingsPage }))
);

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

export default function App() {
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
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  );
}
