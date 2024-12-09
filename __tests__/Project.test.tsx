/* eslint-disable testing-library/no-node-access */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/alt-text */
import { render, screen } from "@testing-library/react";
import Project from "@/app/projects/[id]/page";
import "@testing-library/jest-dom";

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

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

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));
jest.mock("../src/app/Component/SimilarProjects", () => {
  return function MockSimilarProjects() {
    return <div data-testid="similar-projects">Similar Projects</div>;
  };
});

describe("Project Page", () => {
  it("renders the correct project based on the id from the URL", async () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(await Project({ params: mockParams }));

    const projectName = await screen.findByText("Project 1");
    const projectDescription = await screen.findByText("Description 1");
    expect(projectName).toBeInTheDocument();
    expect(projectDescription).toBeInTheDocument();

    const image = await screen.findByAltText("Project Thumbnail");
    expect(image).toHaveAttribute("src", "/path/to/image1.jpg");
  });

  it("renders the similar projects section", async () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(await Project({ params: mockParams }));

    const similarProjectsSection = await screen.findByText("You may also like");
    expect(similarProjectsSection).toBeInTheDocument();

    const similarProjectsComponent = await screen.findByTestId(
      "similar-projects"
    );
    expect(similarProjectsComponent).toBeInTheDocument();
  });

  it("renders the Visit button and links correctly", async () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(await Project({ params: mockParams }));

    const visitButtons = await screen.findAllByText("Visit");
    expect(visitButtons.length).toBeGreaterThan(0);

    visitButtons.forEach((button) => {
      const link = button.closest("a");
      expect(link).toHaveAttribute("href", "http://example.com");
      expect(link).toHaveAttribute("target", "_blank");
    });
  });

  it("displays the project screenshots", async () => {
    const mockParams = Promise.resolve({ id: "1" });
    render(await Project({ params: mockParams }));

    const screenshotImages = await screen.findAllByAltText("Screenshot");
    expect(screenshotImages).toHaveLength(2);
    screenshotImages.forEach((img) => {
      expect(img).toHaveAttribute("src", "/images/screenshot1.png");
    });
  });
});
