import { render, screen } from "@testing-library/react";
import SimilarProjects from "../SimilarProjects";

// Mock the data import to isolate the component for testing
jest.mock("../../../data.json", () => [
  { id: 1, projectName: "Project 1" },
  { id: 2, projectName: "Project 2" },
]);

describe("SimilarProjects Component", () => {
  test("renders without crashing", () => {
    render(<SimilarProjects currentProjectId="1" />);
    const heading = screen.getByRole("heading", { name: "Project 1" });
    expect(heading).toBeInTheDocument();
  });
});
