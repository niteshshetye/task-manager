"use client";
import { SessionProvider } from "next-auth/react";
import { NotificationProvider } from "./context/notification";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </SessionProvider>
  );
};
