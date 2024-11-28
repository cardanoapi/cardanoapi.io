// "use client";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string;
  projectName: string;
  imageUrl: string;
  subImageUrl: string;
  url: string;
  description: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  projectName,
  imageUrl,
  subImageUrl,
  description,
}) => {
  return (
    <div
      data-testid="cardElement"
      className="max-w-64  rounded-2xl flex overflow-hidden py-1 hover:text-[#1A80E5]"
    >
      <Link href={`/projects/${id}`}>
        <Image
          className="rounded-2xl w-full flex h-72 sm:min-h-64 object-cover"
          src={imageUrl}
          width={400}
          height={450}
          alt={`${projectName} thumbnail`}
        />
        <div className="py-6">
          <div className="flex gap-3">
            <Image
              className="size-9"
              src={subImageUrl}
              width={50}
              height={60}
              alt={`${projectName} logo`}
            />
            <h1 className="font-bold text-base mb-2 ">{projectName}</h1>
          </div>
          <p className="text-sm py-2  text-[#6D7D8B] group-hover:text-[#1A80E5]">
            {description}
          </p>
        </div>
      </Link>
    </div>
  );
};
