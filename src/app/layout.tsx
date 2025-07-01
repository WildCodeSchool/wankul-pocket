import { CollectionProvider } from "@/context/CollectionContext";
import { UserProvider } from "@/context/UserContext";
import Header from "@/ui/Header";
import Tapbar from "@/ui/Tapbar";
import { Jaldi } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";
import { OpenedCardsProvider } from "@/context/OpenedCardsContext";
import { DisplayRandomWankul } from "@/ui/DisplayRandomWankul";

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
                <Header />
                <main>{children}</main>
                <DisplayRandomWankul />
                <Tapbar />
              </CollectionProvider>
            </OpenedCardsProvider>
          </UserProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
