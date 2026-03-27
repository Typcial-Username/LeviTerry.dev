import RepoManager from "../../../../components/RepoManager";
import ObjectivesView from "../../../../components/ui/uat/ObjectivesView";
import { getPortfolioData } from "@/src/lib/portfolio-data";

const RoboticsBoardPage = async () => {
  const projects = await getPortfolioData();

  const resRepos =
    projects?.projects.filter((proj) =>
      proj?.objectives?.some((rt) => rt.code.toLowerCase().startsWith("res-"))
    ) ?? [];

  // console.log(resRepos[0].metadata);

  return (
    <RepoManager>
      <br />

      <h1>Robotics Board UAT Page</h1>
      <p>Found {resRepos.length} repositories</p>

      <br />

      <ObjectivesView
        objectives={[
          {
            id: "res-1",
            description:
              "Design and complete robotic and embedded systems solutions that apply to real-world situations and challenges.",
          },
          {
            id: "res-2",
            description:
              "Implement a simple microprocessor using digital logic design.",
          },
          {
            id: "res-3",
            description:
              "Demonstrate embedded system design skills including, but not limited to, microcontroller selection, schematic design, printed circuit board layout, design for electromagnetic compatibility and design for manufacturing.",
          },
          {
            id: "res-4",
            description:
              "Apply knowledge of transducers, actuators and simultaneous hardware and software development in the design of an embedded system.",
          },
          {
            id: "res-5",
            description:
              "Design and analyze real-time embedded systems, including advanced digital logic design, signal processing and high-speed digital systems.",
          },
          {
            id: "res-6",
            description:
              "Implement and evaluate algorithms and methods enabling autonomy in a mobile robot.",
          },
        ]}
        projects={resRepos}
      />
    </RepoManager>
  );
};

export default RoboticsBoardPage;
