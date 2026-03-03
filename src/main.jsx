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

const preloaded = typeof window !== 'undefined' ? window.__PRELOADED__ : undefined;

ReactDOM.createRoot(document.getElementById('root')).render(
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
