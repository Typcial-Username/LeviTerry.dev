import { NextPage } from "next";
import { filterRepositories } from "../../../utils/repositoryUtils";
import { useRepoContext } from "../../../utils/context/Repo";

const RoboticsBoardPage: NextPage = () => {
  const repos = useRepoContext();
  console.log({ repos });
  
  return <div>Robotics Board UAT Page</div>;
    
}

export default RoboticsBoardPage;