import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Project Card Test", () => {
  test("Should render the title of the project", () => {
    render(
      <Card
        id={"1"}
        projectName="ABC"
        imageUrl="/imageURL"
        description="description"
        url="url"
      />
    );

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
