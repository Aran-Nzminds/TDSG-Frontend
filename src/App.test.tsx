import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

vi.mock('@routes/private-routes', () => ({
  PrivateRoute: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe('App Routing', () => {
  it('renders Home page', () => {
    window.history.pushState({}, 'Home page', '/');
    render(<App />);
    expect(screen.getByText(/home/i)).toBeInTheDocument();
  });

  it('renders About page', () => {
    window.history.pushState({}, 'About page', '/about');
    render(<App />);
    expect(screen.getByText(/about/i)).toBeInTheDocument();
  });

  it('renders Login page', () => {
    window.history.pushState({}, 'Login page', '/login');
    render(<App />);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('renders NotFound page', () => {
    window.history.pushState({}, 'Random page', '/random-page');
    render(<App />);
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
