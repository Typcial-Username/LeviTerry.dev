import { PinnedItems, RepositoryNode, User } from "../utils/types";

export async function getGithubRepos() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const allRepoQuery = `
`;

  const allRepoResponse = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: allRepoQuery,
      variables: { login: "Typcial-Username" },
    }),
  });

  //   console.log(allRepoResponse.body);

  return allRepoResponse.json();

  //   const userRepositories = await allRepoResponse.json()

  //   if (!userRepositories?.data?.user || !pinnedRepos?.data?.user?.pinnedItems) {
  //     throw new Error(
  //       "Failed to fetch user repositories or pinned items from GitHub API"
  //     );
  //   }

  //   const { user }: { user: User } = userRepositories.data;
  //   const { pinnedItems }: { pinnedItems: PinnedItems } = pinnedRepos.data.user;

  //   const allRepos: RepositoryNode[] = user.repositories.edges.map(
  //     (edge) => edge.node
  //   );

  //   const pinnedRepoIds: string[] = pinnedItems.edges.map((edge) => edge.node.id);

  //   const fullPinnedRepos = allRepos.filter((repo) =>
  //     pinnedRepoIds.includes(repo.id)
  //   );

  //   // Filter out repos that have config tags or are pinned
  //   const filteredRepos = allRepos
  //     .filter(
  //       (repo) => !fullPinnedRepos.some((pinnedRepo) => pinnedRepo.id === repo.id)
  //     )
  //     .filter(
  //       (repo) =>
  //         !repo.repositoryTopics.edges.some((topic) =>
  //           topic.node.topic.name.toLowerCase().includes("config")
  //         )
  //     )
  //     .sort((a, b) => {
  //       return a.name.localeCompare(b.name);
  //     });

  //   return {
  //     filteredRepos,
  //     fullPinnedRepos,
  //     revalidate: 60 * 60 * 24, // Revalidate every 24 hours
  //   };
}

function transformRepos(repos: RepositoryNode[]) {}
