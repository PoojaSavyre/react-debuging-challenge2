import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import { PreloadProvider } from './context/PreloadContext';
import './index.css';

const rootEl = document.getElementById('root');
const preloaded =
  typeof document !== 'undefined' && document.getElementById('__PRELOAD_DATA__')
    ? JSON.parse(document.getElementById('__PRELOAD_DATA__').textContent)
    : typeof window !== 'undefined'
      ? window.__PRELOADED__
      : undefined;
const isSSR =
  rootEl.hasChildNodes() &&
  !(rootEl.childNodes.length === 1 && rootEl.childNodes[0].nodeType === Node.COMMENT_NODE);

const tree = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <PreloadProvider initialData={preloaded}>
              <App />
            </PreloadProvider>
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

async function bootstrap() {
  if (isSSR) {
    const pathname = window.location.pathname;
    const routeChunks = {
      '/': () => import('./pages/LandingPage.jsx'),
      '/search': () => import('./pages/SearchResultsPage.jsx'),
      '/about': () => import('./pages/AboutPage.jsx'),
      '/contact': () => import('./pages/ContactPage.jsx'),
      '/help': () => import('./pages/HelpPage.jsx'),
      '/terms': () => import('./pages/TermsPage.jsx'),
      '/privacy': () => import('./pages/PrivacyPage.jsx'),
      '/destinations': () => import('./pages/DestinationsPage.jsx'),
      '/offers': () => import('./pages/OffersPage.jsx'),
      '/my-bookings': () => import('./pages/MyBookingsPage.jsx'),
      '/confirmation': () => import('./pages/ConfirmationPage.jsx'),
      '/passengers': () => import('./pages/PassengerFormPage.jsx'),
      '/seats': () => import('./pages/SeatSelectionPage.jsx'),
      '/baggage': () => import('./pages/BaggagePage.jsx'),
      '/review': () => import('./pages/ReviewPage.jsx'),
    };
    let loader = routeChunks[pathname];
    if (!loader && pathname.startsWith('/flight/')) loader = () => import('./pages/FlightDetailPage.jsx');
    if (loader) await loader();
    ReactDOM.hydrateRoot(rootEl, tree);
  } else {
    ReactDOM.createRoot(rootEl).render(tree);
  }
}

bootstrap();
