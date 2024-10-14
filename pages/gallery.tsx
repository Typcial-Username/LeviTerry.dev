import { NextPage } from "next";
import { Card } from "../components/Card";
import Head from "next/head";
import { Octokit } from "octokit";
import { useEffect, useMemo, useState } from "react";
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
  languages: string[];
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

  // Fetch repos
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await octokit.request("GET /users/Typcial-Username/repos", {
          username: "Typcial-Username",
          accept: "application/vnd.github+json",
          headers: {
            "X-Github-Api-Version": "2022-11-28",
          },
        });

        const repos = res.data.map((repo: Repo) => ({
          name: repo.name,
          id: repo.id,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage,
          languages: repo.languages,
        }));

        setRepos(repos);
      } catch (err) {
        console.error("Error fetching repos: ", err);
      }
    };

    fetchRepos();
  }, [octokit]);

  // Fetch languages for each repo
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        for (const repo of repos) {
          const res = await octokit.request(
            `GET /repos/Typcial-Username/${repo.name}/languages`,
            {
              owner: "Typcial-Username",
              repo: repo.name,
              accept: "application/vnd.github+json",
              headers: {
                "X-Github-Api-Version": "2022-11-28",
              },
            }
          );

          repo.languages = Object.keys(res.data);
        }
      } catch (err) {
        console.error("Error fetching languages: ", err);
      }
    };

    fetchLanguages();
  }, [octokit, repos]);

  console.log({ completeRepos: repos });

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
          // width: "100%",
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

                  {repo.languages && repo.languages.length > 0 ? (
                    <span>
                      {repo.languages.map((lang) => (
                        <p
                          key={`${repo.id}+${lang}`}
                          style={{
                            border: "1px solid red",
                            borderRadius: "5px",
                          }}
                        >
                          {lang}
                        </p>
                      ))}
                    </span>
                  ) : (
                    <p>No Known Languages</p>
                  )}

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

        {/* <div
          className={`grid`}
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
        </div> */}

        {/* <br /> */}

        {/* <h1>Objective 1</h1> */}

        {/* <br /> */}

        {/* <h1>Objective 2</h1>

        <div
          className="grid"
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
        </div>

        <br />

        <h1>Objective 3</h1>

        <div
          className="grid"
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
        </div>

        <br />

        <h1>Objective 3</h1>

        <div
          className="grid"
          style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
          <Card
            title="Example Project"
            description={`Example project description.`}
          />
        </div> */}
      </div>
    </>
  );
};

export default Gallery;
