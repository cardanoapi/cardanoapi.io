import Image from "next/image";
import data from "../../data.json";

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
            <div key={project.id} className="flex p-3">
              <div className="max-w-2/6 h-full">
                <Image
                  className="rounded"
                  src="/images/ethereum.jpg"
                  alt={project.projectName}
                  width={150}
                  height={150}
                />
              </div>
              <div className="w-4/6">
                <h2>{project.projectName}</h2>
                <p>{project.projectName}</p>
              </div>
            </div>
          ))
      }
    </>
  );
}
