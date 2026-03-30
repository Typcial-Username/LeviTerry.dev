import { createContext } from 'react'
import { RepositoryNode } from './types'

type ProjectContextType = {
    pinnedProjects: RepositoryNode[],
    allProjects: RepositoryNode[],
    setPinnedProjects?: (projects: RepositoryNode[]) => void,
    setAllProjects?: (projects: RepositoryNode[]) => void,
    filterByLanguage?: (language: string) => RepositoryNode[],
    filterByTopic?: (topic: string) => RepositoryNode[],
    filterByFork?: (isFork: boolean) => RepositoryNode[],
    sortByStars?: (projects: RepositoryNode[]) => RepositoryNode[],
    sortByDate?: (projects: RepositoryNode[]) => RepositoryNode[],
    sortByName?: (projects: RepositoryNode[]) => RepositoryNode[],
} 

export const ProjectContext = createContext<ProjectContextType>({
    pinnedProjects: [],
    allProjects: [],
    setPinnedProjects: (pinnedProjects: RepositoryNode[]) => {},
    setAllProjects: (pinnedProjects: RepositoryNode[]) => {},
    filterByLanguage: (language: string) => [],
    filterByTopic: (topic: string) => [],
    filterByFork: (isFork: boolean) => [],
    sortByStars: (projects: RepositoryNode[]) => projects,
    sortByDate: (projects: RepositoryNode[]) => projects,
    sortByName: (projects: RepositoryNode[]) => projects,
})
  

export const ProjectContextProvider = ProjectContext.Provider