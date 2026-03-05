"use client";

import React from "react";
import { Card } from "../ui/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faCodeFork,
} from "@fortawesome/free-solid-svg-icons";
import styles from "../../styles/Gallery.module.css";
import { PortfolioData } from "@/src/lib/github";

interface RepositoryCardProps {
  repository: PortfolioData["repos"][number];
  isPinned?: boolean;
}

type LanguageInfo = {
  name: string;
  color?: string | null;
  size: number;
  percent: number;
};

export const RepositoryCard: React.FC<RepositoryCardProps> = ({
  repository: repo,
  isPinned = false,
}) => {
  if (!repo) {
    throw new Error("No repo found");
  }

  const computeLanguages = (
    languages: typeof repo.languages
  ): LanguageInfo[] => {
    const total = languages.reduce((sum, l) => sum + l.size, 0);

    return languages
      .map((lang) => ({
        name: lang.node.name,
        color: lang.node.color,
        size: lang.size,
        percent: total ? (lang.size / total) * 100 : 0,
      }))
      .sort((a, b) => b.size - a.size);
  };

  const renderLanguages = () => {
    if (!repo || repo.languages.length === 0) {
      return (
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--clr-text-secondary, #ccc)",
          }}
        >
          No Known Languages
        </p>
      );
    }

    const languages = computeLanguages(repo.languages);

    return (
      <div key={`${repo.node?.id}+languages`} className={styles.languages}>
        <div className={styles.languageBar}>
          {languages.map((lang) => (
            <span
              key={`${repo.node?.id}-bar-${lang.name}`}
              className={styles.languageBarSegment}
              style={{
                width: `${lang.percent}%`,
                backgroundColor: lang.color || "#888",
              }}
            />
          ))}
        </div>

        {languages.map((lang) => (
          <>
            <div
              key={`${lang.name}-color`}
              className={styles.languageColor}
              style={{ backgroundColor: lang.color || "#888" }}
            />

            <p className={styles.languageName}>
              {lang.name} {lang.percent.toFixed(1)}
            </p>
          </>
        ))}
      </div>
    );
  };

  const renderTopics = () => {
    if (!repo.repositoryTopics || repo.repositoryTopics.length === 0) {
      return (
        <p
          style={{
            fontSize: "0.75rem",
            color: "var(--clr-text-secondary, #ccc)",
          }}
        >
          No Topics
        </p>
      );
    }

    return repo.repositoryTopics.map((node) => (
      <span
        key={`${repo.node?.id}+${node.node?.topic.name}`}
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
        {node.node?.topic.name}
      </span>
    ));
  };

  return (
    <Card
      key={isPinned ? `pinned-${repo.node?.id}` : repo.node?.id}
      isPinned={isPinned}
      header={
        <span>
          {repo.node?.isFork ?
            <span>
              <FontAwesomeIcon icon={faCodeFork} /> {repo.node?.id}
            </span>
          : repo.node?.name}
        </span>
      }
      description={repo.node?.description || "No Given Description"}
      content={
        <>
          <br />
          <p key={`${repo.node?.id}+stars`} className={styles.repositoryStats}>
            <span className={styles.starIcon}>⭐ Stars </span>
            <span className={styles.starCount}>
              {repo.node?.stargazerCount}
            </span>
          </p>

          <br />
          {renderLanguages()}

          <br />
          {renderTopics()}
          <br />
          <br />
        </>
      }
      link={repo.node?.homepageUrl || undefined}
      footer={
        <a href={repo.node?.url} target="_blank" rel="noreferrer">
          View Source <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      }
    />
  );
};

function getFullLanguagesSize(
  languages: {
    __typename?: "LanguageEdge" | undefined;
    size: number;
    node: {
      __typename?: "Language" | undefined;
      name: string;
      color?: string | null | undefined;
    };
  }[]
): number {
  return languages.reduce((acc, cur) => acc + cur.size, 0);
}
