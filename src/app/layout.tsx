import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import TopBanner from "@/components/molecules/topbnanner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Deinhandymarkt",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TopBanner />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
