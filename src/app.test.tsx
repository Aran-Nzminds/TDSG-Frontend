import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import App from "./app";
import { AuthProvider } from "./hooks/use-auth";

// Mock react-i18next
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
  Trans: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock private/public routes just to pass children
vi.mock("@routes/private-routes", () => ({
  PrivateRoute: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
vi.mock("@routes/public-routes", () => ({
  PublicRoute: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("app Routing", () => {
  it("renders Home page", () => {
    window.history.pushState({}, "Home page", "/");
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );
    // Using getByText since "Projects" is rendered in a <div>, not a <h*> tag
    expect(screen.getByRole("heading", { name: /projects/i })).toBeInTheDocument();
  });

  it("renders About page", () => {
    window.history.pushState({}, "About page", "/about");
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );
    expect(screen.getByText(/unknown user/i)).toBeInTheDocument();
  });

  it("renders Login page", () => {
    window.history.pushState({}, "Login page", "/login");
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );

    // Option 1: Check for the main heading text
    expect(screen.getByText(/sign in to continue/i)).toBeInTheDocument();

    // Option 2: Check for the Microsoft button
    expect(screen.getByText(/sign in with microsoft/i)).toBeInTheDocument();
  });

  it("renders NotFound page", () => {
    window.history.pushState({}, "Random page", "/random-page");
    render(
      <AuthProvider>
        <App />
      </AuthProvider>,
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
