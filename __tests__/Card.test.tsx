import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "@/app/Component/Card";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));
describe("Card Component", () => {
  const mockProps = {
    id: "1",
    projectName: "Test Project",
    imageUrl: "/test-image.jpg",
    subImageUrl: "/test-logo.jpg",
    url: "/test-project",
    description: "This is a test project description.",
  };

  test("renders the Card component without crashing", () => {
    render(<Card {...mockProps} />);
    expect(screen.getByTestId("cardElement")).toBeInTheDocument();
  });

  test("displays project name", () => {
    render(
      <Card
        id="1"
        projectName="Test Project"
        imageUrl="/path/to/image.jpg"
        subImageUrl="/path/to/logo.jpg"
        url="/projects/1"
        description="This is a test project."
      />
    );
    expect(screen.getByText("Test Project")).toBeInTheDocument();
  });
  test("renders main image correctly", () => {
    render(
      <Card
        id="1"
        projectName="Test Project"
        imageUrl="/path/to/image.jpg"
        subImageUrl="/path/to/logo.jpg"
        url="/projects/1"
        description="This is a test project."
      />
    );
    const mainImage = screen.getByAltText("Test Project thumbnail");
    expect(mainImage).toHaveAttribute("src");
    expect(mainImage.getAttribute("src")).toContain("/path/to/image.jpg");
  });

  test("renders sub-image correctly", () => {
    render(
      <Card
        id="1"
        projectName="Test Project"
        imageUrl="image"
        subImageUrl="/path/to/logo.jpg"
        url="/projects/1"
        description="This is a test project."
      />
    );

    const subImage = screen.getByAltText("Test Project logo");
    expect(subImage).toHaveAttribute("src");
    expect(subImage.getAttribute("src")).toContain("/path/to/logo.jpg");
  });

  test("navigates to correct link", () => {
    render(
      <Card
        id="1"
        projectName="Test Project"
        imageUrl="/path/to/image.jpg"
        subImageUrl="/path/to/logo.jpg"
        url="/projects/1"
        description="This is a test project."
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/projects/1");
  });
  test("applies hover styles", () => {
    render(
      <Card
        id="1"
        projectName="Test Project"
        imageUrl="/path/to/image.jpg"
        subImageUrl="/path/to/logo.jpg"
        url="/projects/1"
        description="This is a test project."
      />
    );
    const card = screen.getByTestId("cardElement");
    fireEvent.mouseOver(card);
    expect(card).toHaveClass("hover:text-[#1A80E5]");
  });
});
