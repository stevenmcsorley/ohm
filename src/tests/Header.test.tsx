import { describe, it } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../components/Header";

describe("Header", () => {
  it("renders the header correctly", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Check for the logo
    expect(screen.getByText("Steven McSorley")).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByTestId("nav-home")).toHaveAttribute("href", "/");
    expect(screen.getByTestId("nav-about")).toHaveAttribute("href", "/about");
    expect(screen.getByTestId("nav-projects")).toHaveAttribute(
      "href",
      "/projects"
    );
    expect(screen.getByTestId("nav-contact")).toHaveAttribute(
      "href",
      "/contact"
    );
  });

  it("toggles the menu on small screens", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    // Get the nav element
    const navElement = screen.getByRole("navigation");

    // Check initial state of the menu
    expect(navElement).toHaveClass("hidden", { exact: false });

    // Toggle the menu
    const menuButton = screen.getByRole("button");
    fireEvent.click(menuButton);

    // Check if menu is now visible
    expect(navElement).toHaveClass("block", { exact: false });

    // Toggle the menu back
    fireEvent.click(menuButton);

    // Check if menu is hidden again
    expect(navElement).toHaveClass("hidden", { exact: false });
  });
});
