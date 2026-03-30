import { createContext, useContext } from 'react'
import { PinnedItemNode, RepositoryNode } from '../types';
import { FilterOptions } from '../../components/RepositoryFilter';

export interface RepoContextValue {
    repos: RepositoryNode[];
    pinnedRepos: PinnedItemNode[]
    setRepos: React.Dispatch<React.SetStateAction<RepositoryNode[]>>;
    lastFetched: number | null;
    setLastFetched: (timestamp: number) => void;
    isCacheValid: () => boolean;
}

export const RepoContext = createContext<RepoContextValue | null>(null);
export const useRepoContext = () => useContext(RepoContext);

export function updateRepoContext(repoData: RepositoryNode[]) {
  return {
    ...repoData
  };
}

export function filterRepos(
    repos: RepositoryNode[] = [],
    filter: FilterOptions | ((repo: RepositoryNode) => boolean) | null = null
): RepositoryNode[] {
    if (!filter) return repos.slice();

    // if the caller provided a predicate, just use it
    if (typeof filter === 'function') return repos.filter(filter);

    // Generic helper: get nested prop by dot path (e.g. "owner.login")
    const getProp = (obj: any, path: string) => {
        if (path === '*') return obj; // special wildcard means "whole object"
        return path.split('.').reduce((acc, p) => (acc == null ? undefined : acc[p]), obj);
    };

    // Interpret filter object as: { "<prop>": string | RegExp | (value)=>boolean, ... }
    const propFilters = filter as unknown as Record<string, string | RegExp | ((v: any) => boolean)>;

    return repos.filter(repo => {
        for (const key of Object.keys(propFilters)) {
            const f = propFilters[key];
            const value = getProp(repo, key);

            if (typeof f === 'function') {
                if (!f(value)) return false;
            } else if (f instanceof RegExp) {
                if (!f.test(String(value ?? ''))) return false;
            } else {
                // treat plain strings as simple case-insensitive regex
                const re = new RegExp(String(f), 'i');
                // special case: wildcard property '*' -> search entire object JSON for a match
                if (key === '*') {
                    const hay = JSON.stringify(value ?? repo);
                    if (!re.test(hay)) return false;
                } else {
                    if (!re.test(String(value ?? ''))) return false;
                }
            }
        }
        return true;
    });
}

/**
 * Hook variant that uses the RepoContext cached repos when you don't want
 * to pass the repos array manually.
 *
 * Usage inside components:
 *   const filtered = useFilterRepos({ 'name': 'foo' });
 */
export function useFilterRepos(
    filter: FilterOptions | ((repo: RepositoryNode) => boolean) | null = null,
    repos?: RepositoryNode[]
): RepositoryNode[] {
    const ctx = useRepoContext();
    const source = repos ?? (Array.isArray(ctx) ? ctx : []);
    return filterRepos(source, filter);
}