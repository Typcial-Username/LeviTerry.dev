//#region Imports
import { NextPage } from "next";
import Head from "next/head";
import styles from "../../styles/Gallery.module.css";
import { updateRepoContext } from "../../utils/context/Repo";

import { PinnedItems, RepositoryNode, User } from "../../utils/types";

import React, { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { ProjectCard } from "../../components/ui/ProjectCard";
import { SkeletonCards } from "../../components/SkeletonCard";
import {
  RepositoryFilter,
  FilterOptions,
} from "../../components/RepositoryFilter";
import {
  filterRepositories,
  getRepositoryStats,
} from "../../utils/repositoryUtils";
import { RepoManager } from "../../components/RepoManager";
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
    searchTerm: "",
    selectedLanguage: "",
    selectedTopic: "",
    sortBy: "name",
    showForks: true,
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
              <span className={styles.statNumber}>
                {repoStats.topLanguages.length}
              </span>
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

        {isLoading ?
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
        : <>
            {fullPinnedRepos?.length > 0 && (
              <>
                <div className={styles.sectionHeader}>
                  <h1>Featured Projects</h1>
                </div>

                <div className={styles.repositoryGrid}>
                  {fullPinnedRepos.map((repo) => (
                    <ProjectCard
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
              {filteredRepositories.length > 0 ?
                filteredRepositories.map((repo) => (
                  <ProjectCard key={repo.id} repository={repo} />
                ))
              : <div className={styles.emptyState}>
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
              }
            </div>
          </>
        }
      </div>
      {/* <ProjectCard></ProjectCard> */}
    </>
  );
};

const Gallery: NextPage<GalleryProps> = (props) => {
  return (
    <RepoManager>
      <GalleryContent {...props} />
    </RepoManager>
  );
};

// export async function getStaticProps() {

//   // Add repos to repo context
//   // updateRepoContext([...filteredRepos, ...fullPinnedRepos]);
//   // console.log("Repository context updated from Gallery page.");

//   return {
//     props: {
//       filteredRepos,
//       fullPinnedRepos,
//     },
//     revalidate: 60 * 60 * 24, // Revalidate every 24 hours
//   };
// }

export default Gallery;
