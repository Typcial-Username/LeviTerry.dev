export interface Language {
  name: string;
  color: string;
}

export interface RepositoryTopic {
  topic: {
    name: string;
  };
}

export interface RepositoryNode {
  name: string;
  description: string;
  id: string;
  url: string;
  homepageUrl: string;
  languages: {
    totalSize: number;
    edges: {
      size: number;
      node: Language;
    }[];
  };
  stargazerCount: number;
  repositoryTopics: {
    edges: {
      node: RepositoryTopic;
    }[];
  };
  isFork: boolean;
  pushedAt: string;
}

export interface User {
  repositories: {
    edges: {
      node: RepositoryNode;
    }[];
  };
}

export interface PinnedItemNode {
  name: string;
  id: string;
}

export interface PinnedItems {
  edges: {
    node: PinnedItemNode;
  }[];
}
