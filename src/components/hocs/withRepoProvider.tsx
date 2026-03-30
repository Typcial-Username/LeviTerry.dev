import RepoManager from "../RepoManager";
import { ComponentType } from 'react'

export function withRepoProvider<T extends JSX.IntrinsicAttributes>(Page: ComponentType<T>) {
    return function RepoProvidedPage(props: T) {
        return (
            <RepoManager>
                <Page {...props} />
            </RepoManager>
        )
    }
}