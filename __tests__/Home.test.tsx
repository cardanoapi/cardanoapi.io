import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../src/app/page";
import "@testing-library/jest-dom";

// Mock data (assuming 10 projects for pagination test)
jest.mock("../src/data.json", () => [
  {
    id: "1",
    projectName: "Project 1",
    imageUrl: "/path/to/image1.jpg",
    subImageUrl: "/path/to/subimage1.jpg",
    description: "Description 1",
    url: "#",
  },
  {
    id: "2",
    projectName: "Project 2",
    imageUrl: "/path/to/image2.jpg",
    subImageUrl: "/path/to/subimage2.jpg",
    description: "Description 2",
    url: "#",
  },
  {
    id: "3",
    projectName: "Project 3",
    imageUrl: "/path/to/image3.jpg",
    subImageUrl: "/path/to/subimage3.jpg",
    description: "Description 3",
    url: "#",
  },
  {
    id: "4",
    projectName: "Project 4",
    imageUrl: "/path/to/image4.jpg",
    subImageUrl: "/path/to/subimage4.jpg",
    description: "Description 4",
    url: "#",
  },
  {
    id: "5",
    projectName: "Project 5",
    imageUrl: "/path/to/image5.jpg",
    subImageUrl: "/path/to/subimage5.jpg",
    description: "Description 5",
    url: "#",
  },
  {
    id: "6",
    projectName: "Project 6",
    imageUrl: "/path/to/image6.jpg",
    subImageUrl: "/path/to/subimage6.jpg",
    description: "Description 6",
    url: "#",
  },
  {
    id: "7",
    projectName: "Project 7",
    imageUrl: "/path/to/image7.jpg",
    subImageUrl: "/path/to/subimage7.jpg",
    description: "Description 7",
    url: "#",
  },
  {
    id: "8",
    projectName: "Project 8",
    imageUrl: "/path/to/image8.jpg",
    subImageUrl: "/path/to/subimage8.jpg",
    description: "Description 8",
    url: "#",
  },
  {
    id: "9",
    projectName: "Project 9",
    imageUrl: "/path/to/image9.jpg",
    subImageUrl: "/path/to/subimage9.jpg",
    description: "Description 9",
    url: "#",
  },
]);

describe("Home Page", () => {
  test("renders the correct number of cards for the current page", () => {
    render(<Home />);

    // Initially, it should show the first 8 cards (cards per page = 8)
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(8);

    // Check the first card's text
    expect(screen.getByText("Project 1")).toBeInTheDocument();
  });

  test("renders 2nd page correctly when Next is clicked", () => {
    render(<Home />);

    // Click Next to go to the second page
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);

    // It should now show cards 9 and 10
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(1); // Since there are only 9 cards, the second page will have only 1 card.

    expect(screen.getByText("Project 9")).toBeInTheDocument();
  });

  test("disables the Previous button on the first page", () => {
    render(<Home />);

    // The Previous button should be disabled on the first page
    const prevButton = screen.getByText("Previous");
    expect(prevButton).toBeDisabled();
  });

  test("disables the Next button on the last page", () => {
    render(<Home />);

    let nextButton = screen.getByText("Next") as HTMLButtonElement;

    // Loop until the Next button becomes disabled
    while (!nextButton.disabled) {
      fireEvent.click(nextButton);
      nextButton = screen.getByText("Next") as HTMLButtonElement;
    }

    // Once on the last page, the Next button should be disabled
    expect(nextButton).toBeDisabled();
  });

  test("navigates correctly when page numbers are clicked", () => {
    render(<Home />);

    // Check if the second page button is clickable
    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    // After clicking the page 2 button, it should show the next set of cards
    const cards = screen.getAllByRole("link");
    expect(cards).toHaveLength(1); // Since there are only 9 cards, the second page will have 1 card.

    expect(screen.getByText("Project 9")).toBeInTheDocument();
  });
});
