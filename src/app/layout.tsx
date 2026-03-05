import HelpBar from "../components/layout/HelpBar";
import { Terminal } from "../components/layout/Terminal";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Explorer from "../components/layout/Explorer";

import "../styles/globals.css";

type LayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html>
      <body>
        <Explorer />
        <Sidebar />
        <HelpBar />

        <Header />

        <main className="container">
          {children}
          <br />
        </main>

        <Terminal />
      </body>
    </html>
  );
}
