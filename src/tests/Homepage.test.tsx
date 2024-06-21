import { describe, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import HomePage from "../views/HomePage";
import { getPostMetadata } from "../utils/loadPosts";

vi.mock("../utils/loadPosts");

describe("HomePage", () => {
  it("renders the homepage correctly", async () => {
    const mockPosts = [
      {
        id: "1",
        title: "Post 1",
        description: "Description 1",
        slug: "post-1",
        related: false,
        date: "2024-06-20",
        category: "Category 1",
      },
      {
        id: "2",
        title: "Post 2",
        description: "Description 2",
        slug: "post-2",
        related: true,
        date: "2024-06-21",
        category: "Category 2",
      },
    ];
    (getPostMetadata as jest.Mock).mockResolvedValue(mockPosts);

    global.fetch = vi.fn().mockResolvedValue({
      json: vi.fn().mockResolvedValue(["Quote 1", "Quote 2"]),
    });

    render(
      <Router>
        <HelmetProvider>
          <HomePage />
        </HelmetProvider>
      </Router>
    );

    // Check for meta tags
    await waitFor(() => {
      const title = document.querySelector("title");
      expect(title).toHaveTextContent("Steven McSorley | Home");
    });

    await waitFor(() => {
      expect(screen.getByText("Post 1")).toBeInTheDocument();
      expect(screen.getByText("Description 1")).toBeInTheDocument();
    });

    // Check for related content
    await waitFor(() => {
      expect(screen.getByText("Post 2")).toBeInTheDocument();
      expect(screen.getByText("Description 2")).toBeInTheDocument();
    });

    // Check for random quote
    await waitFor(() => {
      const quoteElements = screen.getAllByText((content) => {
        return content.startsWith("Quote");
      });
      expect(quoteElements.length).toBeGreaterThan(0);
    });
  });
});
