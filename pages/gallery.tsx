import { NextPage } from "next";
import { Card } from "../components/Card";
import Head from "next/head";
import { Octokit } from "octokit";
import { useEffect, useMemo, useRef, useState } from "react";
import { config } from "dotenv";
import path from "path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

// Load environment variables
config({ path: path.join(__dirname, "..") });

// Define Repo interface
interface Repo {
  name: string;
  id: number;
  description: string;
  html_url: string;
  homepage: string;
  languages: { [key: string]: number };
  topics: string[];
}

const Gallery: NextPage = () => {
  // Create Octokit instance
  const octokit = useMemo<Octokit>(
    () =>
      new Octokit({
        auth: process.env.GITHUB_TOKEN,
      }),
    []
  );

  const [repos, setRepos] = useState<Repo[]>([]);
  let willExceedRateLimit = useRef<boolean>(false);
  let rateLimitReset = useRef<number>(0);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        if (
          !willExceedRateLimit.current &&
          rateLimitReset.current <= Date.now()
        ) {
          return;
        }
        const res = await octokit.request("GET /users/Typcial-Username/repos", {
          username: "Typcial-Username",
          accept: "application/vnd.github+json",
          headers: {
            "X-Github-Api-Version": "2022-11-28",
          },
        });

        if (res.headers["x-ratelimit-remaining"] === "0") {
          willExceedRateLimit.current = true;
          rateLimitReset.current = parseInt(
            res.headers["x-ratelimit-reset"] as string
          );
        } else if (
          willExceedRateLimit.current &&
          rateLimitReset.current <= Date.now()
        ) {
          willExceedRateLimit.current = false;
          rateLimitReset.current = 0;
        }

        const repos = res.data.map((repo: any) => ({
          name: repo.name,
          id: repo.id,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          languages: null,
          topics: null,
        }));

        // Fetch languages and topics for each repo
        const updatedRepos = await Promise.all(
          repos.map(async (repo: Repo) => {
            if (
              willExceedRateLimit.current &&
              rateLimitReset.current > Date.now()
            ) {
              throw new Error("Rate limit exceeded. Please try again later.");
            }

            const [languagesRes, topicsRes] = await Promise.all([
              octokit.request(
                `GET /repos/Typcial-Username/${repo.name}/languages`,
                {
                  owner: "Typcial-Username",
                  repo: repo.name,
                  accept: "application/vnd.github+json",
                  headers: {
                    "X-Github-Api-Version": "2022-11-28",
                  },
                }
              ),
              octokit.request(
                `GET /repos/Typcial-Username/${repo.name}/topics`,
                {
                  owner: "Typcial-Username",
                  repo: repo.name,
                  accept: "application/vnd.github+json",
                  headers: {
                    "X-Github-Api-Version": "2022-11-28",
                  },
                }
              ),
            ]);

            if (
              languagesRes.headers["x-ratelimit-remaining"] === "0" ||
              topicsRes.headers["x-ratelimit-remaining"] === "0"
            ) {
              willExceedRateLimit.current = true;
              rateLimitReset.current = Math.max(
                parseInt(languagesRes.headers["x-ratelimit-reset"] as string),
                parseInt(topicsRes.headers["x-ratelimit-reset"] as string)
              );
            }

            return {
              ...repo,
              languages: languagesRes.data,
              topics: topicsRes.data.names,
            };
          })
        );

        setRepos(updatedRepos);
      } catch (err) {
        console.error("Error fetching repos, languages, or topics: ", err);
      }
    };

    fetchRepos();
  }, [octokit]);

  function totalBytesOfLanguage(languages: [string, number][]) {
    let totalBytes = 0;

    for (const language of languages) {
      totalBytes += language[1];
    }

    return totalBytes;
  }

  return (
    <>
      <Head>
        <title>Levi Terry&apos;s Developer Portfolio | Gallery</title>
      </Head>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: 0,
          padding: 0,
          width: "100%",
          overflowY: "scroll",
        }}
      >
        <h1>Personal Projects</h1>

        <br />

        <div
          className="grid"
          style={{
            margin: "0 5% 0 5%",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
        >
          {repos.map((repo) => (
            <Card
              key={repo.id}
              title={repo.name}
              description={
                repo.description ? repo.description : "No Given Description"
              }
              content={
                <>
                  <br />

                  {repo.languages && Object.keys(repo.languages).length > 0 ? (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                      }}
                    >
                      {Object.entries(repo.languages).map(([lang, bytes]) => (
                        <>
                          <div
                            key={`${repo.id}+${lang}-color`}
                            style={{
                              width: "1rem",
                              height: "1rem",
                              backgroundColor: "orange",
                              borderRadius: "10rem",
                              margin: 0,
                              padding: 0,
                            }}
                          />
                          <p
                            key={`${repo.id}+${lang}`}
                            style={{
                              color: "white",
                              fontWeight: "bold",
                              borderRadius: "10rem",
                              width: "fit-content",
                              margin: "0.25rem",
                              padding: "0.25rem",
                              fontSize: "0.6rem",
                            }}
                          >
                            {lang}{" "}
                            {(
                              (bytes /
                                totalBytesOfLanguage(
                                  Object.entries(repo.languages)
                                )) *
                              100
                            ).toFixed(1)}
                            %{" "}
                          </p>
                        </>
                      ))}
                    </span>
                  ) : (
                    <p>No Known Languages</p>
                  )}

                  {/* {
                    <span>
                      {repo.topics && repo.topics.length > 0 ? (
                        <p>
                          {repo.topics.map((topic) => (
                            <span
                              key={`${repo.id}+${topic}`}
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                                borderRadius: "10rem",
                                width: "fit-content",
                                margin: "0.25rem",
                                padding: "0.25rem",
                                fontSize: "0.75rem",
                              }}
                            >
                              {topic}
                            </span>
                          ))}
                        </p>
                      ) : (
                        <p>No Known Topics</p>
                      )}
                    </span>
                  } */}

                  <br />

                  <span>
                    <FontAwesomeIcon icon={faExternalLinkAlt} />{" "}
                    <a href={repo.html_url} target="_blank" rel="noreferrer">
                      Source Code
                    </a>
                  </span>
                </>
              }
              link={repo.homepage || undefined}
            />
          ))}
        </div>

        <br />

        <h1>Objective 1</h1>

        <br />

        <h1>Objective 2</h1>

        {/* <div
          className="grid"
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
        </div> */}

        <br />

        <h1>Objective 3</h1>

        {/* <div
          className="grid"
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
        </div> */}

        <br />

        <h1>Objective 4</h1>

        {/* <div
          className="grid"
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
        </div> */}
      </div>
    </>
  );
};

export default Gallery;
