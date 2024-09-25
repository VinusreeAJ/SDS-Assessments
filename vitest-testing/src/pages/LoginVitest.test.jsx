import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ToastContainer } from 'react-toastify';
import '@testing-library/jest-dom';

import Login from './Login';

// Removed render from each individual tests
beforeEach(() => {
  render(<Login />);
});

describe('Login Component', () => {
  test('submitting the form without entering a password displays an error message', async () => {

    // Fill email and leave password empty
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit'));

    // Wait for error message
    const errorMessage = await screen.findByText(/password is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('submitting the form without entering an email displays an error message', async () => {

    // Fill password and leave email empty
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit'));

    // Wait for error message
    const errorMessage = await screen.findByText(/email is required/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('submitting the form with both email and password fields filled displays a success message', async () => {
    render(
      <>
        <ToastContainer />
      </>
    );

    // Fill both fields
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.click(screen.getByTestId('submit'));

    // Wait for success message
    const successMessage = await screen.findByText(/successfully logged in!/i);
    expect(successMessage).toBeInTheDocument();
  });
});
