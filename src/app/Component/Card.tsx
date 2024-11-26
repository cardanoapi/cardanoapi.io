// "use client";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  projectName: string;
  imageUrl: string;
  url: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  projectName,
  imageUrl,
  description,
}) => {
  return (
    <div className="size-80 rounded-lg overflow-hidden py-3 hover:text-[#1A80E5]">
      <Link href={`/projects/${id}`}>
        <Image
          className=" size-4/6  w-full rounded-lg"
          src={imageUrl}
          width={350}
          height={400}
          alt={`${projectName} thumbnail`}
        />
        <div className="py-4 ">
          <div className="flex gap-3">
            <Image
              className="size-9"
              src={imageUrl}
              width={50}
              height={50}
              alt={`${projectName} logo`}
            />
            <h1 className="font-bold mb-2 ">{projectName}</h1>
          </div>
          <p className="text-base py-2  ">{description}</p>
        </div>
      </Link>
    </div>
  );
};
