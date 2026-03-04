import { NextPage } from "next";
import RepoManager from "../../../../components/RepoManager";
import { useRepoContext } from "../../../../utils/context/Repo";
import { withRepoProvider } from "../../../../components/hocs/withRepoProvider";
import ObjectivesView from "../../../../components/ui/uat/ObjectivesView";

const DmfContent = () => {
  const repos = useRepoContext();
  console.log({ repos });

  const dmfRepos =
    repos?.repos.filter((repo) =>
      repo.repositoryTopics?.edges.some((rt) =>
        rt.node.topic.name.startsWith("DMF-")
      )
    ) ?? [];

  return (
    <>
      <br />

      <h1>DMF Board UAT Page</h1>
      <p>Found {dmfRepos.length} repositories</p>

      <br />

      <ObjectivesView
        objectives={[
          {
            id: "DMF-1",
            description:
              "Demonstrate the ability to evaluate material and build technique options during the creation of products and their prototypes.",
          },
          {
            id: "DMF-2",
            description:
              "Demonstrate the ability to effectively implement embedded systems and fundamental electronics into product builds.",
          },
          {
            id: "DMF-3",
            description:
              "Place prototype and builds within the Agile and MVP development frameworks.",
          },
          {
            id: "DMF-4",
            description:
              "Create product designs that incorporate engineering factors using solid modeling and design tools.",
          },
          {
            id: "DMF-5",
            description:
              "Build physical products while demonstrating technique and safety competency across commonly accepted prototyping devices and maker tools and techniques.",
          },
          {
            id: "DMF-6",
            description:
              "Produce products that balance form and function while reflecting current and future trends in design and human factors.",
          },
        ]}
        repos={dmfRepos}
      />
    </>
  );
};

const DmfBoardPage: NextPage = () => {
  return (
    <RepoManager>
      <DmfContent />
    </RepoManager>
  );
};

export default withRepoProvider(DmfBoardPage);
