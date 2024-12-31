/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import ProjectPage from "@/app/projects/[id]/page";
import "@testing-library/jest-dom";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

// Mock next/link
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
}));

// Mock SimilarProjects component
jest.mock("../src/app/Component/SimilarProjects", () => {
  return function MockSimilarProjects() {
    return <div data-testid="similar-projects">Similar Projects</div>;
  };
});

// Mock fetch function
global.fetch = jest.fn();

// Mock project data
const mockProject = {
  id: "1",
  projectname: "Test Project",
  projecturl: "https://test.com",
  imageurl: "/test-image.jpg",
  subimageurl: "/test-sub-image.jpg",
  description: "Test Description",
  about: "Test About Section",
  createdAt: "2024-01-01",
  published: true,
  updatedAt: "2024-01-01",
};

const mockApiResponse = {
  projects: [mockProject],
  results: 1,
  status: "success",
};

describe("ProjectPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
  });

  it("renders project details correctly", async () => {
    const params = Promise.resolve({ id: "1" });
    render(await ProjectPage({ params }));

    // Check if main project details are rendered
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test About Section")).toBeInTheDocument();

    // Check if navigation elements are present
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getAllByText("Visit").length).toBeGreaterThan(0); // Ensures buttons exist

    // Optionally, verify each button individually
    screen.getAllByText("Visit").forEach((button) => {
      expect(button).toBeInTheDocument();
    });

    // Check if similar projects section is rendered
    expect(screen.getByTestId("similar-projects")).toBeInTheDocument();
  });
});
