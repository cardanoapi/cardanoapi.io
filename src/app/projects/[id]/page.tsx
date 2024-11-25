import Image from "next/image";
import data from "../../../data.json";
import SimilarProjects from "@/app/Component/SimilarProjects";

export default async function Project({ params }: { params: { id: string } }) {
  const { id } = await params;

  const project = data.find((project) => project.id === id);
  return (
    <>
      <div className="flex-col w-9/12 m-auto overflow-x-hidden py-4">
        <div className="py-4">
          <div className="flex">
            <Image
              className="sm: w-44"
              src="/images/ethereum.jpg"
              alt="Project Thumbnail"
              width={80}
              height={80}
            ></Image>
            <div className="flex flex-col w-full px-4 gap-2">
              <h1 className="font-semibold text-base">
                {project?.projectName}
              </h1>
              <p className="w-full font-normal text-xs">
                {project?.description}
              </p>
              <button className=" hidden sm:block justify-center rounded-lg text-white bg-[#1A80E5] hover:bg-white hover:text-[#1A80E5] w-1/6 py-1 border-2 border-[#1A80E5]">
                Visit
              </button>
            </div>
          </div>
          <button className="sm:hidden justify-center rounded-lg text-white bg-[#1A80E5] hover:bg-white hover:text-[#1A80E5] w-full py-1 my-8 border-2 border-[#1A80E5]">
            Visit
          </button>
          <div className="flex gap-4 w-full">
            {/* QuickStart Section */}
            <div className="hidden xl:block flex-col my-8 border border-neutral-500 w-3/12 p-4">
              <h1 className="font-bold">
                QuickStart Plutus and Cardano Development
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
            <div className="flex gap-4 overflow-x-auto my-8 h-2/6 sm:w-9/12">
              <img
                className="rounded h-2/6 sm:w-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdgJXE2MbWrMAX_9HbjS3PaFiYK-FkqIctA&s"
                alt="Screenshot"
                width={200}
                height={200}
              />
              <img
                className="rounded h-2/6 sm:w-auto"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMdgJXE2MbWrMAX_9HbjS3PaFiYK-FkqIctA&s"
                alt="Screenshot"
                width={200}
                height={200}
              />
            </div>
          </div>

          <div>
            <h2 className="font-bold">About this app</h2>
            <p>{project?.about}</p>
          </div>
          <div>
            <h1 className="font-bold">You may also like</h1>
            <div className="flex flex-wrap">
              <SimilarProjects currentProjectId={id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
