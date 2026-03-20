import { PortfolioData } from "@/src/lib/github";
import { ProjectCard } from "../ProjectCard";

interface Objective {
  id: string;
  description: string;
}

const ObjectivesView = ({
  objectives,
  repos,
}: {
  objectives: Objective[];
  repos: PortfolioData["repos"];
}) => {
  return (
    <div
      id="objectives"
      className="flex justify-between m-left-2"
      style={{ margin: "1.25em 10% 0 10%" }}
    >
      <div
        className="float-left w-1/2 text-left"
        style={{ float: "left", textAlign: "left", width: "48%" }}
      >
        <ul>
          {objectives.slice(0, 3).map((obj) => {
            return (
              <li key={`${obj.id}-L`} style={{ marginBottom: "1rem" }}>
                <div>
                  <p>{obj.description}</p>

                  <br />

                  {repos
                    .filter((repo) =>
                      repo?.repositoryTopics?.some(
                        (rt) =>
                          rt?.node?.topic.name.toLowerCase() ===
                          obj.id.toLowerCase()
                      )
                    )
                    .map((repo) => {
                      return (
                        <div
                          id={repo?.node?.id}
                          key={`${repo?.node?.id}`}
                          style={{ display: "flex" }}
                        >
                          <ProjectCard
                            repository={repo}
                            key={`${repo?.node?.id}/${obj.id}`}
                          />
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        className="float-right w-1/2 text-left"
        style={{ float: "right", textAlign: "left", width: "48%" }}
      >
        <ul>
          {objectives.slice(3, 6).map((obj) => {
            return (
              <li key={`${obj.id}-R`}>
                <div>
                  <p>{obj.description}</p>

                  <br />

                  {repos
                    .filter((repo) =>
                      repo.repositoryTopics.some(
                        (rt) =>
                          rt.node?.topic.name.toLowerCase() ===
                          obj.id.toLowerCase()
                      )
                    )
                    .map((repo) => {
                      return (
                        <div
                          id={repo.node?.id}
                          key={repo.node?.id}
                          style={{ display: "flex" }}
                        >
                          <ProjectCard
                            repository={repo}
                            key={`${repo.node?.id}/${obj.id}`}
                          />
                        </div>
                      );
                    })}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default ObjectivesView;
