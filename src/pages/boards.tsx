import { ProjectContext } from '../utils/ProjectContext'

import { useContext } from 'react'
import { NextPage } from 'next'

import Head from 'next/head'
import { RepositoryNode } from '../utils/types'

const Boards: NextPage = () => {
    const { pinnedProjects, allProjects } = useContext(ProjectContext)

    return (
        <>
            <Head>
                <title>Levi Terry&apos;s Developer Portfolio | Boards</title>
            </Head>

            {
                console.log({ allProjects, pinnedProjects })
            }

            <div>
                <h1>Pinned Projects</h1>
                <ul>
                    {pinnedProjects.map((project: RepositoryNode) => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>

                <h1>All Projects</h1>
                <ul>
                    {allProjects.map((project: RepositoryNode) => (
                        <li key={project.id}>{project.name}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Boards