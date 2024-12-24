import { Metadata } from "next";
import Pagination from "./Component/Pagination";

export const metadata: Metadata = {
  title: "Cardano API",
  description: "A list of Cardano Api projects",
  metadataBase: new URL("https://cardanoapi.io"),
  openGraph: {
    title: "Cardano Api",
    description: "A list of Cardano Api Projects",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "Cardano Api",
      },
    ],
    siteName: "https://cardanoapi.io",
  },
};

interface Project {
  id: string;
  projectname: string;
  projecturl: string;
  imageurl: string;
  subimageurl: string;
  description: string;
  about: string;
  createdAt: string;
  published: boolean | null;
  updatedAt: string;
}

interface ApiResponse {
  projects: Project[];
  results: number;
  status: string;
}

async function getProjects(): Promise<Project[]> {
  try {
    const response = await fetch("http://localhost:8000/api/projects", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects!");
    }

    const data: ApiResponse = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();
  const cardsPerPage = 8;
  const totalPages = Math.max(1, Math.ceil(projects.length / cardsPerPage));

  // Map the API data structure to match what the Pagination component expects
  const mappedProjects = projects.map((project) => ({
    id: project.id,
    projectName: project.projectname,
    url: project.projecturl,
    imageUrl: project.imageurl,
    subImageUrl: project.subimageurl,
    description: project.description,
  }));

  return (
    <div className="sm:px-44 py-4 sm:py-8 flex flex-col min-h-screen">
      <Pagination
        data={mappedProjects}
        cardsPerPage={cardsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
