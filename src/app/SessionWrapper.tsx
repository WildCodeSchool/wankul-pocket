"use client";

import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";

export default function SessionWrapper({
  children,
}: PropsWithChildren<object>) {
  return <SessionProvider>{children}</SessionProvider>;
}
