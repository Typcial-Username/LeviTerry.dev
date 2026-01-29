import { NextPage } from "next";
import { useRepoContext } from "../../../utils/context/Repo";
import RepoManager from "../../../components/RepoManager";
import { withRepoProvider } from "../../../components/hocs/withRepoProvider";
import ObjectivesView from "../../../components/ui/uat/ObjectivesView";

const ResContent = () => {
  const repos = useRepoContext();

  const resRepos = repos?.repos.filter(repo => 
    repo.repositoryTopics?.edges.some(rt => rt.node.topic.name.startsWith("RES-"))
  ) ?? [];

  return (
    <>
      <br />

      <h1>Robotics Board UAT Page</h1>
      <p>Found {resRepos.length} repositories</p>

      <br />

      <ObjectivesView objectives={
        [
        { 
          id: "RES-1", 
          description: "Design and complete robotic and embedded systems solutions that apply to real-world situations and challenges." 
        },
        {
          id: "RES-2",
          description: "Implement a simple microprocessor using digital logic design."
        },
        {
          id: "RES-3",
          description: "Demonstrate embedded system design skills including, but not limited to, microcontroller selection, schematic design, printed circuit board layout, design for electromagnetic compatibility and design for manufacturing."
        },
        {
          id: "RES-4",
          description: "Apply knowledge of transducers, actuators and simultaneous hardware and software development in the design of an embedded system."
        },
        {
          id: "RES-5",
          description: "Design and analyze real-time embedded systems, including advanced digital logic design, signal processing and high-speed digital systems."
        },
        {
          id: "RES-6",
          description: "Implement and evaluate algorithms and methods enabling autonomy in a mobile robot."
        }
      
      ]} repos={resRepos} />
    </>
  )
}

const RoboticsBoardPage: NextPage = () => {
  const repos = useRepoContext();
  console.log({ repos });
  
  return (
    <RepoManager>
      <ResContent />
    </RepoManager>
  )
}

export default withRepoProvider(RoboticsBoardPage);