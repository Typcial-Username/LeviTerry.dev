import { NextPage } from "next";
import RepoManager from "../../../../components/RepoManager";
import { useRepoContext } from "../../../../utils/context/Repo";
// import { withRepoProvider } from "../../../../components/hocs/withRepoProvider";
import ObjectivesView from "../../../../components/ui/uat/ObjectivesView";
import { RepositoryNode } from "@/src/utils/types";
import { fetchGitHubRepos } from "@/src/lib/github";

const DmfBoardsPage = async () => {
  const { repos } = await fetchGitHubRepos();
  // console.log({ repos });

  const dmfRepos =
    repos.filter((repo) =>
      repo?.repositoryTopics?.some((rt) =>
        rt?.node?.topic.name.startsWith("dmf-")
      )
    ) ?? [];

  return (
    <RepoManager>
      <br />

      <h1>DMF Board UAT Page</h1>
      <p>Found {dmfRepos.length} repositories</p>

      <br />

      <ObjectivesView
        objectives={[
          {
            id: "dmf-1",
            description:
              "Demonstrate the ability to evaluate material and build technique options during the creation of products and their prototypes.",
          },
          {
            id: "dmf-2",
            description:
              "Demonstrate the ability to effectively implement embedded systems and fundamental electronics into product builds.",
          },
          {
            id: "dmf-3",
            description:
              "Place prototype and builds within the Agile and MVP development frameworks.",
          },
          {
            id: "dmf-4",
            description:
              "Create product designs that incorporate engineering factors using solid modeling and design tools.",
          },
          {
            id: "dmf-5",
            description:
              "Build physical products while demonstrating technique and safety competency across commonly accepted prototyping devices and maker tools and techniques.",
          },
          {
            id: "dmf-6",
            description:
              "Produce products that balance form and function while reflecting current and future trends in design and human factors.",
          },
        ]}
        repos={dmfRepos}
      />
    </RepoManager>
  );
};

export default DmfBoardsPage;
