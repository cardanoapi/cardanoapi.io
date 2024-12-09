/* eslint-disable testing-library/no-node-access */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import Project from "@/app/projects/[id]/page";
import { useParams } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));
// Mocking the data.json import
jest.mock("../src/data.json", () => [
  {
    id: "1",
    projectName: "Project 1",
    subImageUrl: "/path/to/image1.jpg",
    description: "Description 1",
    url: "http://example.com",
  },
  {
    id: "2",
    projectName: "Project 2",
    subImageUrl: "/path/to/image2.jpg",
    description: "Description 2",
    url: "http://example2.com",
  },
]);

// Mocking useParams hook to simulate dynamic routing
jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
}));

describe("Project Page", () => {
  beforeEach(() => {
    // TypeScript needs the correct type for the return value, so specify `id` as a string.
    (useParams as jest.Mock).mockReturnValue({ id: "1" }); // Simulating that the ID from the URL is 1
  });

  it("renders the correct project based on the id from the URL", () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(<Project params={mockParams} />);

    const projectName = screen.getByText("Project 1");
    const projectDescription = screen.getByText("Description 1");
    expect(projectName).toBeInTheDocument();
    expect(projectDescription).toBeInTheDocument();

    const image = screen.getByAltText("Project Thumbnail");
    expect(image).toHaveAttribute("src", "/path/to/image1.jpg");
  });

  it("renders the similar projects section with the correct current project id", () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(<Project params={mockParams} />);

    // Test that the SimilarProjects component is rendered
    const similarProject = screen.getByText("You may also like");
    expect(similarProject).toBeInTheDocument();

    // Ensure SimilarProjects is rendered with the correct currentProjectId
    const project1Card = screen.getByText("Project 1");
    expect(project1Card).toBeInTheDocument();
  });

  it("renders the Visit button and links correctly", () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(<Project params={mockParams} />);

    // Target the Visit button for the screen size you're testing
    const visitButton = screen.getAllByRole("button", { name: /visit/i });

    expect(visitButton[1]).toBeInTheDocument();
    fireEvent.click(visitButton[1]);

    expect(visitButton[0]).toBeInTheDocument();
    fireEvent.click(visitButton[0]);

    // Ensure that the correct URL is opened. (You may want to adjust this to simulate a navigation or an external link click)
    expect(visitButton[0].closest("a")).toHaveAttribute(
      "href",
      "http://example.com"
    );
  });

  it("displays the correct images for the project", () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(<Project params={mockParams} />);

    // Check that the project image and screenshots are rendered correctly
    const projectImage = screen.getByAltText("Project Thumbnail");
    expect(projectImage).toHaveAttribute("src", "/path/to/image1.jpg");

    const screenshotImages = screen.getAllByAltText("Screenshot");
    expect(screenshotImages).toHaveLength(2); // We have two screenshot images in the mock project
    expect(screenshotImages[0]).toHaveAttribute(
      "src",
      "/images/screenshot1.png"
    );
  });
});
