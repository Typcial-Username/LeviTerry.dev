import Header from "./Header"
import { Sidebar } from "./Sidebar"
import { Terminal } from "./Terminal"

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Sidebar />
            <Header file="Home.html"/>
            <main>{children}</main>
            <Terminal />
        </>
    )
}