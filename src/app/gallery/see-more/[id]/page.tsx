"use client";

import { NextPage } from "next";
import { useParams, useSearchParams } from "next/navigation";
import { getRepoByName } from "../../../../utils/repositoryUtils";

const BoardsInfo: NextPage = () => {
  const params = useParams();

  return <div>Boards Info Page for ID: {params?.id}</div>;
};

export default BoardsInfo;
