"use client";

import { Jaldi } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

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
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
