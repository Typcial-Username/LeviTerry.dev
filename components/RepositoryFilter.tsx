import React from 'react';
import { TextInput } from './TextInput';
import styles from '../styles/RepositoryFilter.module.css';
import { RepositoryNode } from '../utils/types';

export interface FilterOptions {
  searchTerm: string;
  selectedLanguage: string;
  selectedTopic: string;
  sortBy: 'name' | 'stars' | 'updated' | 'created';
  showForks: boolean;
}

interface RepositoryFilterProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  repositories: RepositoryNode[];
}

export const RepositoryFilter: React.FC<RepositoryFilterProps> = ({
  filters,
  onFiltersChange,
  repositories
}) => {
  // Extract unique languages from all repositories
  const uniqueLanguages = Array.from(
    new Set(
      repositories
        .flatMap(repo => repo.languages?.edges?.map(edge => edge.node.name) || [])
        .filter(Boolean)
    )
  ).sort();

  // Extract unique topics from all repositories
  const uniqueTopics = Array.from(
    new Set(
      repositories
        .flatMap(repo => repo.repositoryTopics?.edges?.map(edge => edge.node.topic.name) || [])
        .filter(Boolean)
    )
  ).sort();

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterRow}>
        {/* Search Input */}
        <div className={styles.filterGroup}>
          <label htmlFor="search">Search repositories:</label>
          <TextInput
            id="search"
            type="text"
            placeholder="Search by name or description..."
            value={filters.searchTerm}
            onChange={(e) => handleFilterChange('searchTerm', (e.target as HTMLInputElement).value)}
          />
        </div>

        {/* Language Filter */}
        <div className={styles.filterGroup}>
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            className={styles.select}
            value={filters.selectedLanguage}
            onChange={(e) => handleFilterChange('selectedLanguage', e.target.value)}
          >
            <option value="">All Languages</option>
            {uniqueLanguages.map(language => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        {/* Topic Filter */}
        <div className={styles.filterGroup}>
          <label htmlFor="topic">Topic:</label>
          <select
            id="topic"
            className={styles.select}
            value={filters.selectedTopic}
            onChange={(e) => handleFilterChange('selectedTopic', e.target.value)}
          >
            <option value="">All Topics</option>
            {uniqueTopics.map(topic => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.filterRow}>
        {/* Sort By */}
        <div className={styles.filterGroup}>
          <label htmlFor="sortBy">Sort by:</label>
          <select
            id="sortBy"
            className={styles.select}
            value={filters.sortBy}
            onChange={(e) => handleFilterChange('sortBy', e.target.value as FilterOptions['sortBy'])}
          >
            <option value="name">Name</option>
            <option value="stars">Stars</option>
            <option value="updated">Last Updated</option>
            <option value="created">Created Date</option>
          </select>
        </div>

        {/* Show Forks Checkbox */}
        <div className={styles.filterGroup}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filters.showForks}
              onChange={(e) => handleFilterChange('showForks', e.target.checked)}
            />
            Include Forks
          </label>
        </div>

        {/* Clear Filters Button */}
        <div className={styles.filterGroup}>
          <button
            className={styles.clearButton}
            onClick={() => onFiltersChange({
              searchTerm: '',
              selectedLanguage: '',
              selectedTopic: '',
              sortBy: 'name',
              showForks: true
            })}
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};
