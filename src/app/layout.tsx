import type { Metadata } from "next";
import { Jaldi } from "next/font/google";
import "./globals.css";

const jaldi = Jaldi({
  variable: "--font-jaldi",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Wankul Pocket",
  description: "Collectionne les cartes Wankul et échange les avec tes amis!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${jaldi.variable}`}>{children}</body>
    </html>
  );
}
