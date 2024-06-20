import { describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import ProfileCard from "../components/ProfileCard";

describe("ProfileCard", () => {
  const props = {
    title: "Test Title",
    description: "Test Description",
    imageUrl: "test-image.jpg",
    link: "https://test.com",
  };

  it("renders the profile card correctly", () => {
    render(<ProfileCard {...props} />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByAltText(props.title)).toHaveAttribute(
      "src",
      props.imageUrl
    );
    expect(screen.getByRole("link")).toHaveAttribute("href", props.link);
  });
});
