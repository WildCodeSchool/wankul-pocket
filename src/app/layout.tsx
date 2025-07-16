import { CollectionProvider } from "@/context/CollectionContext";
import { OpenedCardsProvider } from "@/context/OpenedCardsContext";
import { QuestProgressProvider } from "@/context/QuestProgressContext";
import { UserProvider } from "@/context/UserContext";
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
  metadataBase: new URL("https://www.wankulpocket.fr/"),
  openGraph: {
    title: "Wankul Pocket",
    description: "Collectionne les cartes Wankul et échange les avec tes amis!",
    url: "https://www.wankulpocket.fr/",
    siteName: "Wankul Pocket",
    images: [
      {
        url: "https://www.wankulpocket.fr/OGImage.png",
        width: 1200,
        height: 630,
        alt: "Aperçu de Wankul Pocket",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wankul Pocket",
    description: "Collectionne les cartes Wankul et échange les avec tes amis!",
    images: ["https://www.wankulpocket.fr/OGImage.png"],
  },
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
