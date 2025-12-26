import React from 'react';
import { Card } from '../ui/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { RepositoryNode } from '../../utils/types';
import styles from '../../styles/Gallery.module.css';

interface RepositoryCardProps {
  repository: RepositoryNode;
  isPinned?: boolean;
}

export const RepositoryCard: React.FC<RepositoryCardProps> = ({ 
  repository: repo, 
  isPinned = false 
}) => {
  const renderLanguages = () => {
    if (!repo.languages || repo.languages.edges.length === 0) {
      return <p style={{ fontSize: "0.75rem", color: "var(--clr-text-secondary, #ccc)" }}>No Known Languages</p>;
    }

    return (
      <div key={`${repo.id}+languages`} className={styles.languages}>
        {repo.languages.edges
          .sort((a, b) => b.size - a.size)
          .map(({ node: { name, color }, size }) => (
            <span 
              key={`${repo.id}+${name}`}
              style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <div
                className={styles.languageColor}
                style={{ backgroundColor: color }}
              />
              <p className={styles.languageName}>
                {name || "Unknown Language"}{" "}
                {((size / repo.languages.totalSize) * 100).toFixed(1)}%
              </p>
            </span>
          ))}
      </div>
    );
  };

  const renderTopics = () => {
    if (!repo.repositoryTopics || repo.repositoryTopics.edges.length === 0) {
      return <p style={{ fontSize: "0.75rem", color: "var(--clr-text-secondary, #ccc)" }}>No Topics</p>;
    }

    return repo.repositoryTopics.edges.map(({ node }) => (
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
    ));
  };

  return (
    <Card
      key={isPinned ? `pinned-${repo.id}` : repo.id}
      isPinned={isPinned}
      header={
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
      description={repo.description || "No Given Description"}
      content={
        <>
          <br />
          {renderLanguages()}
          <br />
          <p key={`${repo.id}+stars`} className={styles.repositoryStats}>
            <span className={styles.starIcon}>⭐</span>
            Stars <span className={styles.starCount}>{repo.stargazerCount}</span>
          </p>
          <br />
          {renderTopics()}
          <br />
          <br />
        </>
      }
      link={repo.homepageUrl || undefined}
      footer={
        <a href={repo.url} target="_blank" rel="noreferrer">
          View Source <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
      }
    />
  );
};
