import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard title', () => {
  render(<App />);
  const titleElement = screen.getByText(/India Growth Dashboard/i);
  expect(titleElement).toBeInTheDocument();
});
