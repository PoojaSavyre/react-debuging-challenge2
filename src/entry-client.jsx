import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from './store';
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const rootEl = document.getElementById('root');
const tree = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <App />
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

const isSSR =
  rootEl.hasChildNodes() &&
  !(rootEl.childNodes.length === 1 && rootEl.childNodes[0].nodeType === Node.COMMENT_NODE);
if (isSSR) {
  ReactDOM.hydrateRoot(rootEl, tree);
} else {
  ReactDOM.createRoot(rootEl).render(tree);
}
