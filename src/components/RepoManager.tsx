import { useState, PropsWithChildren, SetStateAction } from "react";
import { RepoContext } from "../utils/context/Repo";
import {
  PinnedItemNode,
  PinnedItems,
  RepositoryNode,
  User,
} from "../utils/types";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

const RepoManager = ({ children }: PropsWithChildren) => {
  const [repos, setRepos] = useState<RepositoryNode[]>([]);
  const [pinnedRepos, setPinnedRepos] = useState<PinnedItemNode[]>([]);
  const [lastFetched, setLastFetched] = useState<number | null>(null);

  const isCacheValid = () => {
    if (!lastFetched) return false;
    return Date.now() - lastFetched < CACHE_DURATION;
  };

  const updateRepos = (newRepos: SetStateAction<RepositoryNode[]>) => {
    setRepos(newRepos);
    setLastFetched(Date.now());
  };

  const fetchRepos = async () => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };

    const allRepoQuery = `
    {
      user(login: "Typcial-Username") {
      id
      repositories(first: 100) {
        edges {
          node {
            ... on Repository {
              name
              id
              description
              url
              homepageUrl
              pushedAt
              languages(first: 5) {
                totalSize
                edges {
                  size
                  node {
                    name
                    color
                  }
                }
              }
              stargazerCount
              repositoryTopics(first: 5) {
                edges {
                  node {
                    topic {
                      name
                    }
                  }
                }
              }
              isFork
              }
            }
          }
        }
      }
    }
    `;

    const pinnedRepoQuery = `
    {
      user(login: "Typcial-Username") {
        id
        pinnedItems(first: 10) {
          edges {
            node {
              ... on Repository {
                name
                id
              }
            }
          }
        }
      }
    }
    `;

    const orgContribQuery = `
      {
        user(login: "Typcial-Username") {
          organizations(first: 10) {
            nodes {
              login
              name
              avatarUrl
              url
              repositories(first: 20) {
                nodes {
                  name
                  url
                  description
                  id
                  languages(first: 5) {
                    edges {
                      node {
                        name
                        color
                      }
                      size
                    }
                  }
                }
              }
            }
          }
          repositoriesContributedTo(
            first: 50
            includeUserRepositories: false
            contributionTypes: [COMMIT, PULL_REQUEST, REPOSITORY, PULL_REQUEST_REVIEW]
          ) {
            nodes {
              name
              id
              owner {
                login
                avatarUrl
                __typename
              }
              url
              description
              languages(first: 5) {
                edges {
                  node {
                    name
                    color
                  }
                  size
                }
              }
              stargazerCount
            }
          }
        }
      }
    `;

    const [allRepoResponse, pinnedRepoResponse, orgContribResponse] =
      await Promise.all([
        fetch("https://api.github.com/graphql", {
          method: "POST",
          headers,
          body: JSON.stringify({ query: allRepoQuery }),
        }),
        fetch("https://api.github.com/graphql", {
          method: "POST",
          headers,
          body: JSON.stringify({ query: pinnedRepoQuery }),
        }),
        fetch("https://api.github.com/graphql", {
          method: "POST",
          headers,
          body: JSON.stringify({ query: orgContribQuery }),
        }),
      ]);

    const [userRepositories, pinnedRepos, orgContributions] = await Promise.all(
      [
        allRepoResponse.json(),
        pinnedRepoResponse.json(),
        orgContribResponse.json(),
      ]
    );

    console.dir(orgContributions, { depth: null });

    if (
      !userRepositories?.data?.user ||
      !pinnedRepos?.data?.user?.pinnedItems
    ) {
      throw new Error(
        "Failed to fetch user repositories or pinned items from GitHub API"
      );
    }

    const { user }: { user: User } = userRepositories.data;
    const { pinnedItems }: { pinnedItems: PinnedItems } = pinnedRepos.data.user;

    const allRepos: RepositoryNode[] = user.repositories.edges.map(
      (edge) => edge.node
    );

    const pinnedRepoIds: string[] = pinnedItems.edges.map(
      (edge) => edge.node.id
    );

    const fullPinnedRepos = allRepos.filter((repo) =>
      pinnedRepoIds.includes(repo.id)
    );

    // Filter out repos that have config tags or are pinned
    const filteredRepos = allRepos
      .filter(
        (repo) =>
          !fullPinnedRepos.some((pinnedRepo) => pinnedRepo.id === repo.id)
      )
      .filter(
        (repo) =>
          !repo.repositoryTopics.edges.some((topic) =>
            topic.node.topic.name.toLowerCase().includes("config")
          )
      )
      .sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

    setRepos(filteredRepos);
    setPinnedRepos(fullPinnedRepos);
  };

  return (
    <RepoContext.Provider
      value={{
        repos,
        pinnedRepos,
        setRepos: updateRepos,
        lastFetched,
        setLastFetched,
        isCacheValid,
      }}
    >
      {children}
    </RepoContext.Provider>
  );
};

export default RepoManager;
