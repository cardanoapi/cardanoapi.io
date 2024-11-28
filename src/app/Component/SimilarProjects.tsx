import Image from "next/image";
import data from "../../data.json";
import Link from "next/link";

interface SimilarProjectsProps {
  currentProjectId: string; // or number, depending on the type of `id`
}
export default function SimilarProjects({
  currentProjectId,
}: SimilarProjectsProps) {
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
                  src={project.imageUrl}
                  alt={project.projectName}
                  width={100}
                  height={100}
                />
              </div>
              <div className="w-4/6 max-h-full">
                <h2 className="font-normal text-lg ">{project.projectName}</h2>
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
