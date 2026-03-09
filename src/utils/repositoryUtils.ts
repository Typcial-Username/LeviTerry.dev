import { RepositoryNode } from "./types";
import { FilterOptions } from "../components/RepositoryFilter";

export function filterRepositories(
  repositories: RepositoryNode[],
  filters: FilterOptions
): RepositoryNode[] {
  let filtered: RepositoryNode[] = [];

  // Filter by search term (name and description)
  if (filters.searchTerm) {
    const searchLower = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchLower) ||
        (repo.description &&
          repo.description.toLowerCase().includes(searchLower))
    );
  }

  // Filter by language
  if (filters.selectedLanguage) {
    filtered = filtered.filter((repo) =>
      repo.languages?.edges?.some(
        (edge) => edge.node.name === filters.selectedLanguage
      )
    );
  }

  // Filter by topic
  if (filters.selectedTopic) {
    filtered = filtered.filter((repo) =>
      repo.repositoryTopics?.edges?.some(
        (edge) => edge.node.topic.name === filters.selectedTopic
      )
    );
  }

  // Filter out forks if not requested
  if (!filters.showForks) {
    filtered = filtered.filter((repo) => !repo.isFork);
  }

  // Sort repositories
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case "name":
        return a.name.localeCompare(b.name);

      case "stars":
        return b.stargazerCount - a.stargazerCount;

      case "updated":
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();

      case "created":
        // Note: You might need to add createdAt to your GraphQL query
        // For now, we'll use pushedAt as a fallback
        return new Date(b.pushedAt).getTime() - new Date(a.pushedAt).getTime();

      default:
        return 0;
    }
  });

  return filtered;
}

export function getRepositoryStats(repositories: RepositoryNode[]) {
  const totalRepos = repositories.length;
  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazerCount,
    0
  );
  const totalForks = repositories.filter((repo) => repo.isFork).length;

  // Get language statistics
  const languageStats = new Map<string, number>();
  repositories.forEach((repo) => {
    repo.languages?.edges?.forEach((edge) => {
      const current = languageStats.get(edge.node.name) || 0;
      languageStats.set(edge.node.name, current + edge.size);
    });
  });

  // Sort languages by usage
  const topLanguages = Array.from(languageStats.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, size]) => ({ name, size }));

  return {
    totalRepos,
    totalStars,
    totalForks,
    topLanguages,
  };
}

export function getRepoByName(name: string) {
  return (repo: RepositoryNode) =>
    repo.name.toLowerCase() === name.toLowerCase();
}
