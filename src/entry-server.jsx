import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import { PreloadProvider } from './context/PreloadContext';
import { Layout } from './components/Layout';
import { ErrorBoundary } from './components/ErrorBoundary';
import { PageFallback, LoadingFallback } from './components/PageFallback';
import { LandingPage } from './pages/LandingPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { FlightDetailPage } from './pages/FlightDetailPage';
import { PassengerFormPage } from './pages/PassengerFormPage';
import { SeatSelectionPage } from './pages/SeatSelectionPage';
import { BaggagePage } from './pages/BaggagePage';
import { ReviewPage } from './pages/ReviewPage';
import { ConfirmationPage } from './pages/ConfirmationPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { HelpPage } from './pages/HelpPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { OffersPage } from './pages/OffersPage';
import { MyBookingsPage } from './pages/MyBookingsPage';

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

export function render(url, initialData = {}) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <AuthProvider>
          <BookingProvider>
            <PreloadProvider initialData={initialData}>
              <AppSSR />
            </PreloadProvider>
          </BookingProvider>
        </AuthProvider>
      </StaticRouter>
    </Provider>
  );
}
