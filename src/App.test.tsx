import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// This test ensures the "learn react" text is rendered
test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument(); // This matcher comes from @testing-library/jest-dom
});
