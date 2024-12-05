import { render, screen } from "@testing-library/react";
import SimilarProjects from "@/app/Component/SimilarProjects";
import data from "../src/data.json";
import "@testing-library/jest-dom";

// Mock the data import
jest.mock("../src/data.json", () => [
  { id: "1", projectName: "Project 1", imageUrl: "/path/to/image1.jpg" },
  { id: "2", projectName: "Project 2", imageUrl: "/path/to/image2.jpg" },
  { id: "3", projectName: "Project 3", imageUrl: "/path/to/image3.jpg" },
  { id: "4", projectName: "Project 4", imageUrl: "/path/to/image4.jpg" },
  { id: "5", projectName: "Project 5", imageUrl: "/path/to/image5.jpg" },
]);

describe("SimilarProjects Component", () => {
  test("renders similar projects excluding the current project", () => {
    render(<SimilarProjects currentProjectId="1" />);

    // Check if the correct number of projects (excluding the current project) are displayed
    const projectLinks = screen.getAllByRole("link");
    expect(projectLinks).toHaveLength(4);

    // Check if the correct projects are rendered
    expect(screen.getByText("Project 2")).toBeInTheDocument();
    expect(screen.getByText("Project 3")).toBeInTheDocument();
    expect(screen.getByText("Project 4")).toBeInTheDocument();
    expect(screen.getByText("Project 5")).toBeInTheDocument();

    // Ensure the current project (Project 1) is not displayed
    expect(screen.queryByText("Project 1")).not.toBeInTheDocument();
  });

  test("renders image for each project", () => {
    render(<SimilarProjects currentProjectId="1" />);

    // Check if images for projects are rendered correctly
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(4);

    // Verify image alt text matches project names
    expect(images[0]).toHaveAttribute("alt", "Project 2");
    expect(images[1]).toHaveAttribute("alt", "Project 3");
    expect(images[2]).toHaveAttribute("alt", "Project 4");
    expect(images[3]).toHaveAttribute("alt", "Project 5");
  });

  test("renders the correct links for each project", () => {
    render(<SimilarProjects currentProjectId="1" />);

    // Check if each link has the correct href for the project id
    const projectLinks = screen.getAllByRole("link");
    expect(projectLinks[0]).toHaveAttribute("href", "/projects/2");
    expect(projectLinks[1]).toHaveAttribute("href", "/projects/3");
    expect(projectLinks[2]).toHaveAttribute("href", "/projects/4");
    expect(projectLinks[3]).toHaveAttribute("href", "/projects/5");
  });
});
