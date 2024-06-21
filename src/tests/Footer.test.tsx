import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renders the footer correctly", () => {
    render(<Footer />);

    // Check for header text
    expect(screen.getByText("Links")).toBeInTheDocument();
    expect(screen.getByText("Follow Me")).toBeInTheDocument();

    // Check for all links in the footer
    expect(screen.getByRole("link", { name: /About/i })).toHaveAttribute(
      "href",
      "/about"
    );
    expect(screen.getByRole("link", { name: /Projects/i })).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByRole("link", { name: /Contact/i })).toHaveAttribute(
      "href",
      "/contact"
    );
    expect(
      screen.getByRole("link", { name: /Privacy Policy/i })
    ).toHaveAttribute("href", "/privacy-policy");
    expect(
      screen.getByRole("link", { name: /Terms of Service/i })
    ).toHaveAttribute("href", "/terms-of-service");

    // Check for social links
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/steven-mcsorley-08336453/"
    );
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      "https://github.com/stevenmcsorley"
    );

    // Check for copyright text
    expect(
      screen.getByText(/© 2024 Steven McSorley. All rights reserved./i)
    ).toBeInTheDocument();
  });
});
