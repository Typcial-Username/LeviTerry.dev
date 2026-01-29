import { RepositoryNode } from "../../../utils/types";
import { RepositoryCard } from "../RepositoryCard";

interface Objective {
    id: string;
    description: string;
}

const ObjectivesView = ({ objectives, repos }: { objectives: Objective[], repos: RepositoryNode[] }) => {
    return (
        <div id="objectives" className="flex justify-between m-left-2" style={{ margin: '1.25em 10% 0 10%' }}>
            <div className="float-left w-1/2 text-left" style={{ float: "left", textAlign: "left", width: "48%" }}>
                <ul>
                   { objectives.slice(0,3).map((obj) => {
                    return (
                    <li>
                        <div>
                            <p>{obj.description}</p>

                            <br />

                            { repos.filter((repo) => repo.repositoryTopics.edges.some((rt) => rt.node.topic.name === obj.id)).map(repo => {
                                return (
                                    <div id={repo.id}>
                                        <RepositoryCard repository={repo} />
                                    </div>
                                )
                            } )
                        }
                        </div>    
                    </li>
                    )
                   }) }
                </ul>
            </div>

            <div className="float-right w-1/2 text-left" style={{ float: "right", textAlign: "left", width: "48%" }}>
                <ul>
                    { objectives.slice(3,6).map((obj) => {
                        return (
                        <li>
                            <div>
                                <p>{obj.description}</p>

                                <br />

                                { repos.filter((repo) => repo.repositoryTopics.edges.some((rt) => rt.node.topic.name === obj.id)).map(repo => {
                                    return (
                                        <div id={repo.id}>
                                            <RepositoryCard repository={repo} />
                                        </div>
                                    )
                                } )
                            }
                            </div>    
                        </li>
                        )
                    }) }
                </ul>
            </div>
        </div>
    ) 
}

export default ObjectivesView;