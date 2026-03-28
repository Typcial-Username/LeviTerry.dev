import { ProjectCard } from "../ProjectCard";
import { Project } from "@/src/lib/projects.schema";

interface Objective {
  id: string;
  description: string;
}

const ObjectivesView = ({
  objectives,
  projects,
}: {
  objectives: Objective[];
  projects: Project[];
}) => {
  return (
    <div id="objectives" className="max-w-6xl mt-5 mx-auto px-4">
      <ol className="list-decimal columns-2 gap-8 [column-fill:balance]">
        {objectives.map((obj) => (
          <li key={obj.id} className="break-inside-avoid">
            <div className="mb-4">
              <p className="text-left mb-2">{obj.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projects
                  .filter((proj) =>
                    proj?.objectives?.some(
                      (rt) => rt.code.toLowerCase() === obj.id.toLowerCase()
                    )
                  )
                  .map((repo) => {
                    return (
                      <div key={repo.id} className="flex justify-center">
                        <ProjectCard
                          project={repo}
                          key={`${repo.id}-${obj.id}`}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ObjectivesView;
