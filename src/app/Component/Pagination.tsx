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

  // Ensure data is an array and handle empty data
  const safeData = Array.isArray(data) ? data : [];

  // Calculate the index range for the cards to display on the current page
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = safeData.slice(indexOfFirstCard, indexOfLastCard);

  // Handle page change
  const handlePageChange = (pageNumber: number): void => {
    setCurrentPage(pageNumber);
  };

  // If no data, show a message
  if (safeData.length === 0) {
    return <div>No projects available.</div>;
  }

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
        {totalPages > 1 && (
          <>
            <button
              data-testid="previous-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 mx-2 border rounded-full bg-[#D9D9D9] ${
                currentPage === 1 ? "text-[#6D7D8B]" : ""
              } `}
            >
              Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                data-testid="next-button"
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
          </>
        )}
      </div>
    </>
  );
}
