import { IncomingProjectsSchema } from "@/src/lib/portfolio-data";
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
    <div
      id="objectives"
      className="flex justify-between m-left-2"
      style={{ margin: "1.25em 10% 0 10%" }}
    >
      <div className="float-left text-left" style={{ width: "49%" }}>
        <ol className="list-decimal">
          {objectives.slice(0, 3).map((obj) => {
            return (
              <li key={`${obj.id}-L`}>
                <div className="mb-4">
                  <p>{obj.description}</p>

                  <br />

                  <div className="grid ">
                    {projects
                      .filter((proj) =>
                        proj?.objectives?.some(
                          (proj) =>
                            proj?.code.toLowerCase() === obj.id.toLowerCase()
                        )
                      )
                      .map((repo) => {
                        return (
                          <div
                            id={repo.id}
                            key={`${repo.id}`}
                            style={{ display: "flex" }}
                          >
                            <ProjectCard
                              project={repo}
                              key={`${repo.id}/${obj.id}`}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="float-right text-left" style={{ width: "48%" }}>
        <ol className="list-decimal" start={4}>
          {objectives.slice(3, 6).map((obj) => {
            return (
              <li key={`${obj.id}-R`}>
                <div className="mb-4">
                  <p>{obj.description}</p>

                  <br />

                  <div className="grid grid-cols-2">
                    {projects
                      .filter((proj) =>
                        proj?.objectives?.some(
                          (rt) => rt.code.toLowerCase() === obj.id.toLowerCase()
                        )
                      )
                      .map((repo) => {
                        return (
                          <div
                            id={repo.id}
                            key={repo.id}
                            style={{ display: "flex" }}
                          >
                            <ProjectCard
                              project={repo}
                              key={`${repo.id}/${obj.id}`}
                            />
                          </div>
                        );
                      })}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default ObjectivesView;
