import { NextPage } from "next";
import { filterRepositories } from "../../../utils/repositoryUtils";
import { useRepoContext } from "../../../utils/context/Repo";
import RepoManager from "../../../components/RepoManager";
import { withRepoProvider } from "../../../components/hocs/withRepoProvider";
import { Card } from "../../../components/ui/Card";
import { RepositoryCard } from "../../../components/ui/RepositoryCard";

const ResContent = () => {
  const repos = useRepoContext();

  const resRepos = repos?.repos.filter(repo => 
    repo.repositoryTopics?.edges.some(rt => rt.node.topic.name.startsWith("D-1-"))
  ) ?? [];

  return (
        <>
        <br />

        <h1>Robotics Board UAT Page</h1>
        <p>Found {resRepos.length} repositories</p>

        <br />

        <div id="objectives" className="flex justify-between m-left-2" style={{ margin: '1.25em 10% 0 10%' }}>
            <div className="float-left w-1/2 text-left" style={{ float: "left", textAlign: "left", width: "48%" }}>
                <ul>
                    <li>
                        <div>
                            <p>Design and complete robotic and embedded systems solutions that apply to real-world situations and challenges</p>

                            { resRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "RES-1")).map(repo => (
                                <div key={repo.id}>
                                  <RepositoryCard repository={repo} />
                                </div>
                            )) }
                        </div>
                        </li>
                    <li>
                        <p>Implement a simple microprocessor using digital logic design.</p>

                        { resRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "RES-2")).map(repo => (
                            <div key={repo.id}>
                              <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                <li>
                    <p>Demonstrate embedded system design skills including, but not limited to, microcontroller selection, schematic design, printed circuit board layout, design for electromagnetic compatibility and design for manufacturing.</p>
                        
                    { resRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "RES-3")).map(repo => (
                        <div key={repo.id}>
                          <RepositoryCard repository={repo} />
                        </div>
                    )) }
                </li>
                </ul>
            </div>

            <div className="float-right w-1/2 text-left" style={{ float: "right", textAlign: "left", width: "48%" }}>
                <ul>
                    <li>
                        <p>Apply knowledge of transducers, actuators and simultaneous hardware and software development in the design of an embedded system.</p>
                        { resRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "RES-4")).map(repo => (
                            <div key={repo.id}>
                              <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                    <li>
                        <p>Design and analyze real-time embedded systems, including advanced digital logic design, signal processing and high-speed digital systems.</p>
                        { resRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "RES-5")).map(repo => (
                            <div key={repo.id}>
                              <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                    <li>
                        <p>Implement and evaluate algorithms and methods enabling autonomy in a mobile robot.</p>
                        { resRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "RES-6")).map(repo => (
                            <div key={repo.id}>
                              <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                </ul>
            </div>
        </div>
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