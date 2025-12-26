import { NextPage } from "next";
import RepoManager from "../../../components/RepoManager";
import { useRepoContext } from "../../../utils/context/Repo";
import { withRepoProvider } from "../../../components/hocs/withRepoProvider";
import { Card } from "../../../components/ui/Card";
import { RepositoryCard } from "../../../components/ui/RepositoryCard";

const DmfContent = () => {
    const repos = useRepoContext();
    console.log({ repos });

    const dmfRepos = repos?.repos.filter(repo => 
        repo.repositoryTopics?.edges.some(rt => rt.node.topic.name.startsWith("D-2-"))
    ) ?? [];

    return (
        <>
        <br />

        <h1>DMF Board UAT Page</h1>
        <p>Found {dmfRepos.length} repositories</p>

        <br />

        <div id="objectives" style={{ display: "flex", justifyContent: "space-between", margin: "0 auto" }}>
            <div className="float-left w-1/2 text-left" style={{ float: "left", textAlign: "left", width: "48%" }}>
                <ul>
                    <li>
                        <div>
                            <p>Demonstrate the ability to evaluate material and build technique options during the creation of products and their prototypes.</p>

                            { dmfRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "DMF-1")).map(repo => (
                                <div key={repo.id}>
                                    <RepositoryCard repository={repo} />
                                </div>
                            )) }
                        </div>
                        </li>
                    <li>
                        <p>Demonstrate the ability to effectively implement embedded systems and fundamental electronics into product builds.</p>

                        { dmfRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "DMF-2")).map(repo => (
                            <div key={repo.id}>
                            <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                <li>
                    <p>Place prototype and builds within the Agile and MVP development frameworks.</p>
                        
                    { dmfRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "DMF-3")).map(repo => (
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
                        <p>Create product designs that incorporate engineering factors using solid modeling and design tools.</p>
                        { dmfRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "DMF-4")).map(repo => (
                            <div key={repo.id}>
                                <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                    <li>
                        <p>Build physical products while demonstrating technique and safety competency across commonly accepted prototyping devices and maker tools and techniques.</p>
                        { dmfRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "DMF-5")).map(repo => (
                            <div key={repo.id}>
                                <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                    <li>
                        <p>Produce products that balance form and function while reflecting current and future trends in design and human factors.</p>
                        { dmfRepos.filter(repo => repo.repositoryTopics.edges.some(rt => rt.node.topic.name === "DMF-6")).map(repo => (
                            <div key={repo.id}>
                                <RepositoryCard repository={repo} />
                            </div>
                        )) }
                    </li>
                </ul>
            </div>
        </div>
        </>
    );
}

const DmfBoardPage: NextPage = () => {
    return (
        <RepoManager>
            <DmfContent />
        </RepoManager>
    )
}

export default withRepoProvider(DmfBoardPage);