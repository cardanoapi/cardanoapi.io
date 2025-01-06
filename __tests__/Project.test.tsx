/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-container */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import ProjectPage, { generateMetadata } from "../src/app/projects/[id]/page";

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

// Properly set up the fetch mock
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe("ProjectPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
  });

  it("renders project details correctly", async () => {
    const params = Promise.resolve({ id: "1" });
    render(await ProjectPage({ params }));

    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Test About Section")).toBeInTheDocument();
    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getAllByText("Visit").length).toBe(2); // One for mobile, one for desktop
    expect(screen.getByTestId("similar-projects")).toBeInTheDocument();
  });

  it("handles missing project ID", async () => {
    const params = Promise.resolve({ id: "" });
    const { container } = render(await ProjectPage({ params }));

    expect(container).toHaveTextContent("Project not found!");
  });

  it("renders mobile and desktop layouts correctly", async () => {
    const params = Promise.resolve({ id: "1" });
    const { container } = render(await ProjectPage({ params }));

    const mobileButton = container.querySelector(".sm\\:hidden");
    expect(mobileButton).toBeInTheDocument();

    const desktopButton = container.querySelector(".hidden.sm\\:block");
    expect(desktopButton).toBeInTheDocument();
  });
});

describe("generateMetadata", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse,
    });
  });

  it("generates correct metadata for existing project", async () => {
    const params = Promise.resolve({ id: "1" });
    const metadata = await generateMetadata({ params });

    expect(metadata).toEqual({
      title: "Test Project",
      description: "Test Description",
      metadataBase: new URL("https://cardanoapi.io"),
      openGraph: {
        title: "Test Project",
        description: "Test Description",
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(
              "Test Project"
            )}&description=${encodeURIComponent("Test Description")}`,
            width: 1200,
            height: 630,
          },
        ],
      },
    });
  });

  it("returns empty metadata for missing ID", async () => {
    const params = Promise.resolve({ id: "" });
    const metadata = await generateMetadata({ params });
    expect(metadata).toEqual({});
  });

  it("returns empty metadata for non-existent project", async () => {
    const params = Promise.resolve({ id: "nonexistent" });
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ projects: [], results: 0, status: "success" }),
    });

    const metadata = await generateMetadata({ params });
    expect(metadata).toEqual({});
  });

  it("uses default values when project fields are missing", async () => {
    const params = Promise.resolve({ id: "1" });
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        projects: [
          {
            ...mockProject,
            projectname: undefined,
            description: undefined,
          },
        ],
        results: 1,
        status: "success",
      }),
    });

    const metadata = await generateMetadata({ params });
    expect(metadata.title).toBe("Cardano API");
    expect(metadata.description).toBe("A List of Cardano API Projects");
  });
});
