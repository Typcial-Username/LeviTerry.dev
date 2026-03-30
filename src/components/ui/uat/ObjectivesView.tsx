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
  const mid = Math.ceil(objectives.length / 2);
  const left = objectives.slice(0, mid);
  const right = objectives.slice(mid);

  return (
    <div className="max-w-6xl mx-auto px-4 mt-5 flex flex-row">
      <ol className="list-decimal space-y-4">
        {left.map((obj) => {
          return (
            <li key={obj.id}>
              <p>{obj.description}</p>

              <div className="grid grid-cols-2">
                {projects
                  .filter((proj) =>
                    proj.objectives?.some(
                      (pobj) => pobj.code.toLowerCase() === obj.id.toLowerCase()
                    )
                  )
                  .map((project) => {
                    return (
                      <ProjectCard
                        project={project}
                        key={`${project.id}-${obj.id}`}
                        objective={obj}
                      />
                    );
                  })}
              </div>
            </li>
          );
        })}
      </ol>

      <ol className="list-decimal space-y-4" start={mid + 1}>
        {right.map((obj) => {
          return (
            <li key={obj.id}>
              <p>{obj.description}</p>

              <div className="grid grid-cols-2">
                {projects
                  .filter((proj) =>
                    proj.objectives?.some(
                      (pobj) => pobj.code.toLowerCase() === obj.id.toLowerCase()
                    )
                  )
                  .map((project) => {
                    return (
                      <ProjectCard
                        project={project}
                        key={`${project.id}-${obj.id}`}
                        objective={obj}
                      />
                    );
                  })}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ObjectivesView;
