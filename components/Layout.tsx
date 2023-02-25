import Header from "./Header"
import { Sidebar } from "./Sidebar"
import { Terminal } from "./Terminal"

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <Header file="Home.html"/>
            <Sidebar />
            <main>{children}</main>
            <Terminal />
        </>
    )
}