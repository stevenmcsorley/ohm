import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PostExcerpt from "../components/PostExcerpt";

describe("PostExcerpt", () => {
  const props = {
    id: "1",
    title: "Test Post",
    description: "This is a test post",
    slug: "test-post",
    date: "2023-06-20",
    category: "Test Category",
  };

  it("renders the post excerpt correctly", () => {
    render(
      <MemoryRouter>
        <PostExcerpt {...props} />
      </MemoryRouter>
    );

    expect(screen.getByAltText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(
      screen.getByText(new Date(props.date).toLocaleDateString())
    ).toBeInTheDocument();
    expect(screen.getByText(props.category)).toBeInTheDocument();
  });

  it("renders the correct link to the blog post", () => {
    render(
      <MemoryRouter>
        <PostExcerpt {...props} />
      </MemoryRouter>
    );

    const link = screen.getByTestId("post-link");
    expect(link).toHaveAttribute("href", `/blog/${props.slug}`);
  });
});
