import Image from "next/image";
import SimilarProjects from "@/app/Component/SimilarProjects";
import Link from "next/link";
import { notFound } from "next/navigation";

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

type Props = {
  params: Promise<{ id: string }>;
};

async function getProject(id: string): Promise<Project | null> {
  try {
    const response = await fetch("http://localhost:8000/api/projects", {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects!");
    }

    const data: ApiResponse = await response.json();
    return data.projects.find((project) => project.id === id) || null;
  } catch (error) {
    console.error("Error fetching project:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  if (!id) {
    return {};
  }

  const project = await getProject(id);

  if (!project) {
    return {};
  }

  const projectName = project.projectname || "Cardano API";
  const projectDescription =
    project.description || "A List of Cardano API Projects";

  return {
    title: projectName,
    description: projectDescription,
    metadataBase: new URL("https://cardanoapi.io"),
    openGraph: {
      title: projectName,
      description: projectDescription,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(
            projectName
          )}&description=${encodeURIComponent(projectDescription)}`,
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

const ProjectPage = async ({ params }: Props) => {
  const { id } = await params;
  if (!id) {
    return <div>Project not found!</div>;
  }

  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="flex-col w-9/12 m-auto overflow-x-hidden py-4">
      <div className="hidden sm:block">
        <Link href="/" className="text-[#1A80E5]">
          Projects
        </Link>{" "}
        / {project.projectname}
      </div>
      <div className="py-4 flex flex-col">
        <div className="flex h-24 sm:h-32">
          <Image
            className="max-h-full rounded-xl sm:size-56 sm:border border-gray-200 object-contain"
            src={project.subimageurl || ""}
            alt="Project Thumbnail"
            width={100}
            height={100}
          />
          <div className="flex flex-col w-full max-h-full px-4 gap-2">
            <h1 className="font-bold text-base sm:text-2xl">
              {project.projectname}
            </h1>
            <p className="w-full font-normal text-sm text-[#6D7D8B]">
              {project.description}
            </p>
            <Link href={project.projecturl || ""} target="_blank">
              <button className="hidden sm:block justify-center rounded-lg text-white bg-[#1A80E5] hover:bg-white hover:text-[#1A80E5] w-1/6 py-1 border-2 border-[#1A80E5]">
                Visit
              </button>
            </Link>
          </div>
        </div>
        <Link href={project.projecturl || ""} target="_blank">
          <button className="sm:hidden justify-center rounded-lg text-white bg-[#1A80E5] hover:bg-white hover:text-[#1A80E5] w-full py-1 my-4 border-2 border-[#1A80E5]">
            Visit
          </button>
        </Link>
        <div className="flex flex-col py-6 gap-12 w-full">
          <div className="flex gap-4 w-full h-40 sm:h-52">
            <div className="hidden xl:block flex-col rounded-lg border border-neutral-500 w-4/12 p-4 space-y-2 py-8">
              <h1 className="font-bold">
                QuickStart <span className="text-[#1A80E5]">Plutus</span> and
                <span className="text-[#1A80E5]"> Cardano </span>Development
              </h1>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At,
                vel?
              </p>
              <button className="bg-red-500 text-white p-2">
                Try Kuber IDE
              </button>
            </div>

            {/* Image Section */}
            <div className="flex gap-4 overflow-x-auto lg:w-8/12 size-full justify-start">
              <Image
                className="rounded-xl w-auto sm:w-1/2 sm:object-cover"
                src="/images/screenshot1.png"
                alt="Screenshot"
                width={400}
                height={200}
              />
              <Image
                className="rounded-xl w-auto sm:w-1/2 sm:object-cover"
                src="/images/screenshot1.png"
                alt="Screenshot"
                width={400}
                height={200}
              />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-xl">About this app →</h2>
            <p className="font-normal text-lg text-[#6D7D8B]">
              {project.about}
            </p>
          </div>
          <div className="py-4">
            <h1 className="font-bold">You may also like</h1>
            <div className="flex flex-wrap justify-between">
              <SimilarProjects currentProjectId={project.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
