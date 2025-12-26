import { useState, PropsWithChildren, SetStateAction } from "react";
import { RepoContext } from "../utils/context/Repo";
import { RepositoryNode } from "../utils/types";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const RepoManager = ({ children }: PropsWithChildren) => {
    const [repos, setRepos] = useState<RepositoryNode[]>([]);
    const [lastFetched, setLastFetched] = useState<number | null>(null);

    const isCacheValid = () => {
        if (!lastFetched) return false;
        return Date.now() - lastFetched < CACHE_DURATION;
    }

    const updateRepos = (newRepos: SetStateAction<RepositoryNode[]>) => {
        setRepos(newRepos);
        setLastFetched(Date.now());
    }

    return (
        <RepoContext.Provider value={{ 
                repos, 
                setRepos: updateRepos, 
                lastFetched, 
                setLastFetched,
                isCacheValid
            }}>
            {children}
        </RepoContext.Provider>
    )
}

export default RepoManager;