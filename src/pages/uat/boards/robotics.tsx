import { NextPage } from "next";
import { filterRepositories } from "../../../utils/repositoryUtils";
import { useRepoContext } from "../../../utils/context/Repo";
import RepoManager from "../../../components/RepoContext";
import { withRepoProvider } from "../../../components/hocs/withRepoProvider";

const RoboticsBoardPage: NextPage = () => {
  const repos = useRepoContext();
  console.log({ repos });
  
  return (
    <RepoManager>
      <div>Robotics Board UAT Page</div>
    </RepoManager>
  )
}

export default withRepoProvider(RoboticsBoardPage);