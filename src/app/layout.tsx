import { CollectionProvider } from "@/context/CollectionContext";
import { OpenedCardsProvider } from "@/context/OpenedCardsContext";
import { UserProvider } from "@/context/UserContext";
import { QuestProgressProvider } from "@/context/QuestProgressContext";
import { DisplayRandomWankul } from "@/ui/DisplayRandomWankul";
import Header from "@/ui/Header";
import Tapbar from "@/ui/Tapbar";
import type { Metadata } from "next";
import { Jaldi } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

export const metadata: Metadata = {
  title: "Wankul Pocket",
  description: "Collectionne les cartes Wankul et échange les avec tes amis!",
};

const jaldi = Jaldi({
  variable: "--font-jaldi",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${jaldi.variable}`}>
        <SessionWrapper>
          <UserProvider>
            <OpenedCardsProvider>
              <CollectionProvider>
                <QuestProgressProvider>
                  <Header />
                  <main>{children}</main>
                  <DisplayRandomWankul />
                  <Tapbar />
                </QuestProgressProvider>
              </CollectionProvider>
            </OpenedCardsProvider>
          </UserProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
