import { NextPage } from "next";
import RepoManager from "../../../components/RepoContext";
import { useRepoContext } from "../../../utils/context/Repo";
import { withRepoProvider } from "../../../components/hocs/withRepoProvider";

const DmfContent = () => {
    const repos = useRepoContext();
    console.log({ repos });
    return <div>DMF Board UAT Page</div>;
}

const DmfBoardPage: NextPage = () => {
    return (
        <RepoManager>
            <DmfContent />
        </RepoManager>
    )
}

export default withRepoProvider(DmfBoardPage);