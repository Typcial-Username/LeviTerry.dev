import {
  PortfolioDocument,
  PortfolioQuery,
} from "../../generated/types/graphql";
import { print } from "graphql";

type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

type RepoNode = NonNullable<
  NonNullable<
    NonNullable<PortfolioQuery["user"]>["repositories"]["edges"]
  >[number]
>["node"];

export type PortfolioData = ReturnType<typeof transformPortfolio>;

export async function fetchGitHubRepos(): Promise<PortfolioData> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  };

  const queryResponse = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({
      query: print(PortfolioDocument),
      variables: { login: "Typcial-Username" },
    }),
    next: { revalidate: 24 * 60 * 60 },
  });

  const json: GraphQLResponse<PortfolioQuery> = await queryResponse.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }
  if (!json.data) {
    throw new Error("No data returned from GitHub");
  }

  if (!json.data.user) {
    throw new Error(
      "Failed to fetch user repositories or pinned items from GitHub API"
    );
  }

  return transformPortfolio(json.data.user);
}

function transformPortfolio(user: NonNullable<PortfolioQuery["user"]>) {
  const repos = unwrapEdges(user.repositories.edges).map((repo) => ({
    ...repo,
    languages: unwrapEdges(repo.node?.languages?.edges),
    repositoryTopics: unwrapEdges(repo.node?.repositoryTopics.edges),
    metadata: parseMetadata(repo.node),
  }));

  // user.repositories.edges
  //   ?.map((edge) => edge?.node)
  //   .filter(Boolean)
  //   .map((repo) => ({
  //     ...repo!,
  //     languages: repo?.languages?.edges?.filter(Boolean) ?? [],
  //     topics: repo?.repositoryTopics?.edges?.filter(Boolean) ?? [],
  //   })) ?? [];

  const contributed =
    user.repositoriesContributedTo.nodes?.filter(Boolean) ?? [];

  const pinned = unwrapEdges(user.pinnedItems.edges);
  // user.pinnedItems.edges?.map((edge) => edge?.node).filter(Boolean) ?? [];

  const orgs = user.organizations.nodes ?? [];

  return {
    organizations: orgs,
    repos,
    contributedRepos: contributed,
    pinnedRepos: pinned,
  };
}

function unwrapEdges<T>(edges?: (T | null)[] | null): T[] {
  return (edges?.filter(Boolean) as T[]) ?? [];
}

function parseMetadata(repository: RepoNode): unknown | null {
  if (!repository?.object) return null;
  if (repository.object.__typename !== "Blob") return null;

  console.log(repository.object.__typename);

  try {
    return JSON.parse(repository.object.text as string);
  } catch {
    return null;
  }
}
