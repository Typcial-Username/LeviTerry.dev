//#region Imports
import { NextPage } from "next";
import Head from "next/head";
import path from "path";
import styles from '../styles/Gallery.module.css'
import { updateRepoContext } from '../utils/context/Repo'

import {
  PinnedItems,
  RepositoryNode,
  User,
} from "../utils/types";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { RepositoryCard } from "../components/RepositoryCard";
import { SkeletonCards } from "../components/SkeletonCard";
import { RepositoryFilter, FilterOptions } from "../components/RepositoryFilter";
import { filterRepositories, getRepositoryStats } from "../utils/repositoryUtils";
import RepoManager from "../components/RepoContext";
import { withRepoProvider } from "../components/hocs/withRepoProvider";
//#endregion

/**
 * * Main Priority
 * TODO: Make sections collapsible
 * TODO: Add a search bar
 *
 * * Secondary Priority
 * TODO: Add a filter for languages
 * TODO: Add a filter for topics
 * TODO: Add a filter for forks
 * TODO: Add a filter for pinned
 * TODO: Add a filter for last updated
 * TODO: Add a filter for stars
 * TODO: Add a filter for topics
 */

interface GalleryProps {
  filteredRepos: RepositoryNode[];
  fullPinnedRepos: RepositoryNode[];
}

const GalleryContent: React.FC<GalleryProps> = ({
  filteredRepos: allRepos,
  fullPinnedRepos,
}) => {
  let terminalOpen = useRef<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    selectedLanguage: '',
    selectedTopic: '',
    sortBy: 'name',
    showForks: true
  });

  // Filter repositories based on current filters
  const filteredRepositories = useMemo(() => {
    return filterRepositories(allRepos, filters);
  }, [allRepos, filters]);

  // Get repository statistics
  const repoStats = useMemo(() => {
    return getRepositoryStats([...allRepos, ...fullPinnedRepos]);
  }, [allRepos, fullPinnedRepos]);

  useEffect(() => {
    const terminal = document.querySelector(
      "[data-name=terminal]"
    ) as HTMLDivElement;

    terminalOpen.current = terminal?.style.display === "block" ? true : false;
    
    // Simulate loading time for demonstration
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | Gallery</title>
      </Head>

      <RepoManager>
      <div
        className={styles.galleryContainer}
        style={{
          height: `calc(100% - var(--main-m-top) - ${
            terminalOpen.current ? "5rem" : "0"
          })`,
        }}
      >
        <br />

        {/* Repository Statistics */}
        <div className={styles.statsContainer}>
          <h2>Projects Overview</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{repoStats.totalRepos}</span>
              <span className={styles.statLabel}>Total Repositories</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{repoStats.totalStars}</span>
              <span className={styles.statLabel}>Total Stars</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{repoStats.totalForks}</span>
              <span className={styles.statLabel}>Forks</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>{repoStats.topLanguages.length}</span>
              <span className={styles.statLabel}>Languages Used</span>
            </div>
          </div>
        </div>

        {/* Repository Filter */}
        <RepositoryFilter
          filters={filters}
          onFiltersChange={setFilters}
          repositories={allRepos}
        />

        {isLoading ? (
          <>
            {/* Skeleton for Featured Projects */}
            <div className={styles.sectionHeader}>
              <h1>Featured Projects</h1>
            </div>
            <div className={styles.repositoryGrid}>
              <SkeletonCards count={3} isPinned={true} />
            </div>
            
            {/* Skeleton for More Work */}
            <div className={styles.sectionHeader}>
              <h1>More Work</h1>
            </div>
            <div className={styles.repositoryGrid}>
              <SkeletonCards count={8} />
            </div>
          </>
        ) : (
          <>
            {fullPinnedRepos?.length > 0 && (
              <>
                <div className={styles.sectionHeader}>
                  <h1>Featured Projects</h1>
                </div>

                <div className={styles.repositoryGrid}>
                  {fullPinnedRepos.map((repo) => (
                    <RepositoryCard
                      key={`pinned-${repo.id}`}
                      repository={repo}
                      isPinned={true}
                    />
                  ))}
                </div>
              </>
            )}

            <div className={styles.sectionHeader}>
              <h1>
                More Work{" "}
                {filteredRepositories.length !== allRepos.length && (
                  <span className={styles.filterCount}>
                    ({filteredRepositories.length} of {allRepos.length})
                  </span>
                )}
              </h1>
            </div>

            <div className={styles.repositoryGrid}>
              {filteredRepositories.length > 0 ? (
                filteredRepositories.map((repo) => (
                  <RepositoryCard key={repo.id} repository={repo} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <p>No repositories match your current filters.</p>
                  <button
                    className={styles.clearFiltersButton}
                    onClick={() =>
                      setFilters({  
                        searchTerm: "",
                        selectedLanguage: "",
                        selectedTopic: "",
                        sortBy: "name",
                        showForks: true,
                      })
                    }
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
      </RepoManager>
    </>
  );
};

const Gallery: NextPage<GalleryProps> = (props) => {
  return <RepoManager>
    <GalleryContent {...props} />
  </RepoManager>
}

export async function getStaticProps() {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  }

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
  `

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

  const [allRepoResponce, pinnedRepoResponse, orgContribResponse] = await Promise.all([
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
  })
  ])

  const [userRepositories, pinnedRepos, orgContributions] = await Promise.all([
    allRepoResponce.json(),
    pinnedRepoResponse.json(),
    orgContribResponse.json(),
  ]);

  console.dir(orgContributions, {depth: null});

  if (!userRepositories?.data?.user || !pinnedRepos?.data?.user?.pinnedItems) {
    throw new Error("Failed to fetch user repositories or pinned items from GitHub API")
  }

  const { user }: {user: User} = userRepositories.data;
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
      (repo) => !fullPinnedRepos.some((pinnedRepo) => pinnedRepo.id === repo.id)
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

  // Add repos to repo context
  // updateRepoContext([...filteredRepos, ...fullPinnedRepos]);
  // console.log("Repository context updated from Gallery page.");

  return {
    props: {
      filteredRepos,
      fullPinnedRepos,
    },
    revalidate: 60 * 60 * 24, // Revalidate every 24 hours
  };
}

export default Gallery;
