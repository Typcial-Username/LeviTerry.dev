//#region Imports
import { NextPage } from "next";
import { Card } from "../components/Card";
import Head from "next/head";
// import { config } from "dotenv";
import path from "path";
import styles from '../styles/Gallery.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faCodeFork,
} from "@fortawesome/free-solid-svg-icons";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import {
  PinnedItemNode,
  PinnedItems,
  RepositoryNode,
  User,
} from "../utils/types";

import React, { useEffect, useRef } from "react";
//#endregion

// Load environment variables
// config({ path: path.join(__dirname, "..") });

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

const Gallery: NextPage<GalleryProps> = ({
  filteredRepos: allRepos,
  fullPinnedRepos,
}) => {
  let terminalOpen = useRef<boolean>(false);
  useEffect(() => {
      const terminal = document.querySelector(
    "[data-name=terminal]"
  ) as HTMLDivElement;

    terminalOpen.current = terminal?.style.display === "block" ? true : false;
  })
  
  
  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | Gallery</title>
      </Head>

      <div
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   margin: 0,
      //   padding: 0,
      // width: "100%",
          height: `calc(100% - var(--main-m-top) - ${
            terminalOpen.current ? "5rem" : "0"
          })`,
      // overflowY: "scroll",
      // }}
      >
        <br />

        {fullPinnedRepos?.length > 0 && (
          <>
            <h1>Featured Projects</h1>
            <br />

            <div
              className="grid"
              style={{
                margin: "0 5% 0 5%",
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              {fullPinnedRepos.map((repo) => (
                <Card
                  key={`pinned-${repo.id}`}
                  isPinned
                  title={<span>{repo.name}</span>}
                  description="No Given Description"
                  content={
                    <>
                      <br />
                      {
                        repo.languages && repo.languages.edges.length > 0 ? (
                          <div
                            key={`${repo.id}+languages`}
                            className={styles.languages}
                          >
                            {repo.languages.edges.map(
                              ({ node: { name, color }, size }) => (
                                <span key={`${repo.id}+${name}`}>
                                  <div
                                    className={styles.languageColor}
                                    style={{
                                      backgroundColor: color,
                                    }}
                                  />
                                  <p className={styles.languageName}>
                                    {name || "Unknown Language"}{" "}
                                    {((size / repo.languages.totalSize) * 100).toFixed(
                                      1
                                    )}
                                    %
                                  </p>
                                </span>
                              )
                            )}
                          </div>
                        ) : (
                          <p style={{ fontSize: "0.75rem" }}>
                            No Known Languages
                          </p>
                        )
                      }
                      <br />
                      <p key={`${repo.id}+stars`}>
                        ⭐ Stars {repo.stargazerCount}
                      </p>
                      <br />
                      {repo.repositoryTopics &&
                      repo.repositoryTopics.edges.length > 0 ? (
                        repo.repositoryTopics.edges.map(({ node }) => (
                          <span
                            key={`${repo.id}+${node.topic.name}`}
                            style={{
                              backgroundColor: "#121D2F",
                              color: "#3493F8",
                              borderRadius: "0.5rem",
                              padding: "0.25rem",
                              margin: "0.25rem",
                            }}
                            onMouseOver={(e) => {
                              e.currentTarget.style.color = "whitesmoke";
                              e.currentTarget.style.backgroundColor = "#1f6feb";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "#3493F8";
                              e.currentTarget.style.backgroundColor = "#121D2F";
                            }}
                          >
                            {node.topic.name}
                          </span>
                        ))
                      ) : (
                        <p style={{ fontSize: "0.75rem" }}>No Topics</p>
                      )}
                      <br />
                      <br />
                      <FontAwesomeIcon icon={faExternalLinkAlt} />{" "}
                      <a href={repo.url} target="_blank" rel="noreferrer">
                        View Source
                      </a>
                    </>
                  }
                  link={repo.homepageUrl || undefined}
                />
              ))}
            </div>
          </>
        )}

        <br />
        <br />

        <h1>Personal Projects</h1>

        <br />

        <div
          className="grid"
          style={{
            margin: "0 5% 0 5%",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          {allRepos
            .sort((a, b) => {
              return a.name.localeCompare(b.name);
            })
            .map((repo) => (
              <Card
                key={repo.id}
                title={
                  <span>
                    {repo.isFork ? (
                      <span>
                        <FontAwesomeIcon icon={faCodeFork} /> {repo.name}
                      </span>
                    ) : (
                      repo.name
                    )}
                  </span>
                }
                description={
                  repo.description ? repo.description : "No Given Description"
                }
                content={
                  <>
                    <br />

                    {repo.languages && repo.languages.edges.length > 0 ? (
                      <div
                        key={`${repo.id}+languages`}
                        className={styles.languages}
                      >
                        {repo.languages.edges.map(
                          ({ node: { name, color }, size }) => (
                            <span key={`${repo.id}+${name}`}>
                              <div
                              className={styles.languageColor}
                                style={{
                                  backgroundColor: color
                                }}
                              />
                              <p
                                className={styles.languageName}
                              >
                                {name || "Unknown Language"}{" "}
                                {(
                                  (size / repo.languages.totalSize) *
                                  100
                                ).toFixed(1)}
                                %
                              </p>
                            </span>
                          )
                        )}
                      </div>
                    ) : (
                      <p style={{ fontSize: "0.75rem" }}>No Known Languages</p>
                    )}

                    <p key={`${repo.id}+stars`}>
                      ⭐ Stars {repo.stargazerCount}
                    </p>

                    <br />

                    {repo.repositoryTopics &&
                    repo.repositoryTopics.edges.length > 0 ? (
                      repo.repositoryTopics.edges.map(({ node }) => (
                        <span
                          key={`${repo.id}+${node.topic.name}`}
                          className={styles.topic}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = "whitesmoke";
                            e.currentTarget.style.backgroundColor = "#1f6feb";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.color = "#3493F8";
                            e.currentTarget.style.backgroundColor = "#121D2F";
                          }}
                        >
                          {node.topic.name}
                        </span>
                      ))
                    ) : (
                      <p style={{ fontSize: "0.75rem" }}>No Topics</p>
                    )}

                    <br />
                    <br />

                    <a href={repo.url} target="_blank" rel="noreferrer">
                      <span>
                        <FontAwesomeIcon icon={faExternalLinkAlt} /> View
                        Source
                      </span>
                    </a>
                  </>
                }
                link={repo.homepageUrl || undefined}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  const httpLink = createHttpLink({ uri: "https://api.github.com/graphql" });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    };
  });

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

  // const client = new ApolloClient({
  //   link: authLink.concat(httpLink),
  //   cache: new InMemoryCache(),
  // });

  // const { data: userRepositories } = await client.query({
  //   query: gql`
  //     {
  //       user(login: "Typcial-Username") {
  //         id
  //         repositories(first: 100) {
  //           edges {
  //             node {
  //               ... on Repository {
  //                 name
  //                 id
  //                 description
  //                 url
  //                 homepageUrl
  //                 pushedAt
  //                 languages(first: 5) {
  //                   totalSize
  //                   edges {
  //                     size
  //                     node {
  //                       name
  //                       color
  //                     }
  //                   }
  //                 }
  //                 stargazerCount
  //                 repositoryTopics(first: 5) {
  //                   edges {
  //                     node {
  //                       topic {
  //                         name
  //                       }
  //                     }
  //                   }
  //                 }
  //                 isFork
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  // });

  // const { data: pinnedRepos } = await client.query({
  //   query: gql`
  //     {
  //       user(login: "Typcial-Username") {
  //         id
  //         pinnedItems(first: 10) {
  //           edges {
  //             node {
  //               ... on Repository {
  //                 name
  //                 id
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   `,
  // });

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
  const [allRepoResponce, pinnedRepoResponse] = await Promise.all([
    fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query: allRepoQuery }),
  }),
  fetch("https://api.github.com/graphql", {
    method: "POST",
    headers,
    body: JSON.stringify({ query: pinnedRepoQuery }),
  })
  ])

  const [userRepositories, pinnedRepos] = await Promise.all([
    allRepoResponce.json(),
    pinnedRepoResponse.json(),
  ]);

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

  return {
    props: {
      filteredRepos,
      fullPinnedRepos,
    },
    revalidate: 60 * 60 * 24, // Revalidate every 24 hours
  };
}

export default Gallery;
