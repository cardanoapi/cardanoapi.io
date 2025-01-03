// __tests__/Home.test.tsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";
import "@testing-library/jest-dom";

// Mock fetch
global.fetch = jest.fn();

const mockProjects = [
  {
    id: "1",
    projectname: "Project 1",
    projecturl: "#",
    imageurl: "/path/to/image1.jpg",
    subimageurl: "/path/to/subimage1.jpg",
    description: "Description 1",
    about: "About 1",
    createdAt: "2024-01-01",
    published: true,
    updatedAt: "2024-01-01",
  },
];

describe("Home Page", () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({
        projects: mockProjects,
        results: mockProjects.length,
        status: "success",
      }),
    });
  });

  it("renders the page", async () => {
    render(await Home());
    expect(screen.getByText("Project 1")).toBeInTheDocument();
  });

  // it("handles API error gracefully", async () => {
  //   (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
  //   render(await Home());
  //   expect(screen.getByText("No projects available.")).toBeInTheDocument();
  // });
});
