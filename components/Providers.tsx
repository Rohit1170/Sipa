"use client";
import { SessionProvider } from "next-auth/react";
import { FreedomSalePopup } from "@/components/FreedomSalePopup";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
      <FreedomSalePopup />
    </SessionProvider>
  );
}
