import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SearchForm } from './SearchForm';
import { BookingProvider } from '../../context/BookingContext';
import { AuthProvider } from '../../context/AuthContext';

const wrapper = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>
      <BookingProvider>
        {children}
      </BookingProvider>
    </AuthProvider>
  </BrowserRouter>
);

describe('SearchForm', () => {
  it('renders form fields', () => {
    render(<SearchForm />, { wrapper });
    expect(screen.getByLabelText(/from/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/to/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/passengers/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search flights/i })).toBeInTheDocument();
  });

  it('shows validation errors when submitting empty', async () => {
    render(<SearchForm />, { wrapper });
    const form = screen.getByRole('search', { name: /flight search/i });
    await act(async () => {
      fireEvent.submit(form, { preventDefault: () => {} });
    });
    await waitFor(() => {
      expect(screen.getByText(/origin is required/i)).toBeInTheDocument();
    });
  });

  it('calls onSubmit when provided and form is valid', async () => {
    const user = (await import('@testing-library/user-event')).default;
    const onSubmit = vi.fn();
    render(<SearchForm onSubmit={onSubmit} />, { wrapper });
    const fromSelect = screen.getByLabelText(/from/i);
    await user.selectOptions(fromSelect, 'DEL');
    const toSelect = screen.getByLabelText(/to/i);
    await user.selectOptions(toSelect, 'BOM');
    await user.type(screen.getByLabelText(/date/i), '2025-03-15');
    await user.click(screen.getByRole('button', { name: /search flights/i }));
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });
});
