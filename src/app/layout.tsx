import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import NavFootWrapper from "@/components/layout/navfoot-wrapper";
import { ReactChildren } from "@/lib/types";
import ContextWrapper from "@/lib/contexts/context-wrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deinhandymarkt",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <ContextWrapper>
          <NavFootWrapper>
            <main>{children}</main>
          </NavFootWrapper>
        </ContextWrapper>
      </body>
    </html>
  );
}
