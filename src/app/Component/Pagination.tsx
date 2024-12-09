"use client";
import { useState } from "react";
import { Card } from "./Card";

interface Project {
  id: string;
  projectName: string;
  url: string;
  imageUrl: string;
  subImageUrl: string;
  description: string;
}

interface PaginationProps {
  data: Project[];
  cardsPerPage: number;
  totalPages: number;
}

export default function Pagination({
  data,
  cardsPerPage,
  totalPages,
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Calculate the index range for the cards to display on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = data.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page change
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="flex-grow flex flex-wrap justify-around sm:justify-center sm:gap-x-20">
        {currentCards.map((project) => (
          <Card
            key={project.id}
            id={project.id}
            projectName={project.projectName}
            url={project.url}
            imageUrl={project.imageUrl}
            subImageUrl={project.subImageUrl}
            description={project.description}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="bottom-0 left-0 right-0 py-4 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 border rounded-full bg-[#D9D9D9] ${
            currentPage === 1 ? "text-[#6D7D8B]" : ""
          } `}
        >
          Previous
        </button>

        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-2 border rounded-full ${
              currentPage === index + 1
                ? "bg-black text-white"
                : "bg-[#D9D9D9] text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-2 border rounded-full bg-[#D9D9D9] ${
            currentPage === totalPages ? "text-[#6D7D88]" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}
