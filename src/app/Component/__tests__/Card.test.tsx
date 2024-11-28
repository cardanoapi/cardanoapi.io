import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../Card";

describe("Project Card Test", () => {
  test("Should render the title of the project", () => {
    render(
      <Card
        id={"1"}
        projectName="ABC"
        imageUrl="/imageURL"
        subImageUrl="/images/subImageUrl"
        description="description"
        url="url"
      />
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
  test("Should display the project Image", () => {
    render(
      <Card
        id={"1"}
        projectName="ABC"
        imageUrl="/imageURL"
        description="description"
        subImageUrl="/subImageURL"
        url="url"
      />
    );

    const projectImage = screen.getByRole("img", { name: /ABC Thumbnail/i });
    expect(projectImage).toBeInTheDocument();
    expect(projectImage).toBeVisible();
  });
  test("Should display the project description", () => {
    render(
      <Card
        id={"1"}
        projectName="ABC"
        imageUrl="/imageURL"
        subImageUrl="/subImageUrl"
        description="description"
        url="url"
      />
    );
    const description = screen.getByText(/description/i);
    expect(description).toBeInTheDocument();
    expect(description).toBeVisible();
  });
  test("changes text color on hover", async () => {
    render(
      <Card
        id="1"
        projectName="ABC"
        imageUrl="/imageURL"
        subImageUrl="/subImageURL"
        description="This is a description"
        url="url"
      />
    );

    const cardElement = screen.getByTestId("cardElement");

    // Ensure it doesn't have the hover color initially
    expect(cardElement).not.toHaveClass("text-[#1A80E5]");

    // Trigger the hover event on the card
    fireEvent.mouseEnter(cardElement);

    expect(cardElement).toHaveClass(
      "w-80 sm:max-w-72 rounded-2xl flex overflow-hidden py-1 hover:text-[#1A80E5]"
    );
  });
});
