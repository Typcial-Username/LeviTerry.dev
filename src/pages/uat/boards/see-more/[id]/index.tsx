import { NextPage } from "next";
import { useRouter } from 'next/router'
import { getRepoByName } from '../../../../../utils/repositoryUtils'

const BoardsInfo: NextPage = () => {
    const router = useRouter();
    const { id } = router.query;

    {console.log(getRepoByName(id as string))}

    return <div>Boards Info Page for ID: {id}</div>;
}

export default BoardsInfo;