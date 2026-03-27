import HelpBar from "../components/layout/HelpBar";
import { Terminal } from "../components/layout/Terminal";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Explorer from "../components/layout/Explorer";

import "../styles/globals.css";
import { Inter } from "next/font/google";
import { cn } from "../lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html className={cn("font-sans", inter.variable)}>
      <body>
        <Explorer />
        <Sidebar />
        <HelpBar />

        <Header />

        <main className="container">
          {children}
          <br />
        </main>

        {/* <Terminal /> */}
      </body>
    </html>
  );
}
