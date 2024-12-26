import Image from "next/image";
import Link from "next/link";

interface SimilarProjectsProps {
  currentProjectId: string; // or number, depending on the type of `id`
}

interface Project {
  id: string;
  projectname: string;
  projecturl: string;
  imageurl: string;
  subimageurl: string;
  description: string;
  about: string;
  createdAt: string;
  published: boolean;
  updatedAt: string;
}

interface ApiResponse {
  projects: Project[];
  result: number;
  status: string;
}

async function getProject(): Promise<Project[]> {
  try {
    const response = await fetch("http://localhost:8000/api/projects", {
      cache: "no-cache",
    });

    if (!response.ok) {
      throw Error("Failed to fetch projects!!");
    }
    const data: ApiResponse = await response.json();
    return data.projects || [];
  } catch (error) {
    console.error("Error fetching projects: ", error);
    return [];
  }
}

export default async function SimilarProjects({
  currentProjectId,
}: SimilarProjectsProps) {
  const data = await getProject();
  console.log(data, "data form pagination");
  return (
    <>
      {
        // Filter out the current project by checking the id
        data
          .filter((project) => project.id !== currentProjectId)
          .slice(0, 4)
          .map((project) => (
            <Link
              href={`/projects/${project.id}`}
              key={project.id}
              className="flex py-3 w-60 items-center gap-2 h-24 hover:text-[#1A80E5] group"
            >
              <div className="w-3/6 h-full">
                <Image
                  className="rounded-xl object-cover h-full"
                  src={project.imageurl}
                  alt={project.projectname}
                  width={100}
                  height={100}
                />
              </div>
              <div className="w-4/6 max-h-full">
                <h2 className="font-normal text-lg ">{project.projectname}</h2>
                <p className="font-normal text-sm text-[#9D9D9D] group-hover:text-[#1A80E5]">
                  Vice Studio
                </p>
              </div>
            </Link>
          ))
      }
    </>
  );
}
