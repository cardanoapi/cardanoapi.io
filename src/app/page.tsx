import { Card } from "./Component/Card";
import data from "../data.json";

export default function Home() {
  return (
    <div className=" sm:px-44 py-16">
      <div className=" flex flex-wrap justify-around sm:justify-between">
        {data.map((project) => (
          <Card
            key={project.id}
            id={project.id}
            projectName={project.projectName}
            url={project.url}
            imageUrl={project.imageUrl}
            description={project.description}
          />
        ))}
      </div>
    </div>
  );
}
