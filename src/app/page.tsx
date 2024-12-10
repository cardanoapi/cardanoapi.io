import { Metadata } from "next";
import data from "../data.json";
import Pagination from "./Component/Pagination"; // New client component

export const metadata: Metadata = {
  title: "Cardano API",
  description: "A list of Cardano Api projects",
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

export default function Home() {
  const cardsPerPage = 8;
  const totalPages = Math.ceil(data.length / cardsPerPage);

  return (
    <div className="sm:px-44 py-4 sm:py-8 flex flex-col min-h-screen">
      <Pagination
        data={data}
        cardsPerPage={cardsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
