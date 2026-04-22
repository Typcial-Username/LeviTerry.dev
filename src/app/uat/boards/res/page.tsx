import { Metadata } from "next";
import ObjectivesView from "../../../../components/ui/uat/ObjectivesView";
import { getPortfolioData } from "@/src/lib/portfolio-data";

export const metadata: Metadata = {
  title: "RES Boards",
};

const RoboticsBoardsPage = async () => {
  const projects = await getPortfolioData();

  const resRepos =
    projects?.projects.filter((proj) =>
      proj?.objectives?.some((obj) => obj.code.startsWith("RES"))
    ) ?? [];

  return (
    <>
      <br />

      <h1 className="text-3xl text-center">
        UAT Robotics and Embedded Systems - Boards
      </h1>

      <br />

      <ObjectivesView
        objectives={[
          {
            id: "RES-1",
            description:
              "Design and complete robotic and embedded systems solutions that apply to real-world situations and challenges.",
          },
          {
            id: "RES-2",
            description:
              "Implement a simple microprocessor using digital logic design.",
          },
          {
            id: "RES-3",
            description:
              "Demonstrate embedded system design skills including, but not limited to, microcontroller selection, schematic design, printed circuit board layout, design for electromagnetic compatibility and design for manufacturing.",
          },
          {
            id: "RES-4",
            description:
              "Apply knowledge of transducers, actuators and simultaneous hardware and software development in the design of an embedded system.",
          },
          {
            id: "RES-5",
            description:
              "Design and analyze real-time embedded systems, including advanced digital logic design, signal processing and high-speed digital systems.",
          },
          {
            id: "RES-6",
            description:
              "Implement and evaluate algorithms and methods enabling autonomy in a mobile robot.",
          },
        ]}
        projects={resRepos}
      />
    </>
  );
};

export default RoboticsBoardsPage;
