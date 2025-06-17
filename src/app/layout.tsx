import { CollectionProvider } from "@/context/CollectionContext";
import { UserProvider } from "@/context/UserContext";
import Header from "@/ui/Header";
import Tapbar from "@/ui/Tapbar";
import { Jaldi } from "next/font/google";
import "./globals.css";
import SessionWrapper from "./SessionWrapper";

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
            <CollectionProvider>
              <Header />
              {children}
              <Tapbar />
            </CollectionProvider>
          </UserProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}
