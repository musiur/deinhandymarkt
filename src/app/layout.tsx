import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import NavFootWrapper from "@/components/layout/navfoot-wrapper";
import { ReactChildren } from "@/lib/types";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deinhandymarkt",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning>
        <NavFootWrapper>
          <main>{children}</main>
        </NavFootWrapper>
      </body>
    </html>
  );
}
