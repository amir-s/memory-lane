import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainWithHeader from "@/components/ui/MainWithHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Memory lane",
  description: "A simple memory lane",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="forest">
      <body className={inter.className}>
        <MainWithHeader>{children}</MainWithHeader>
      </body>
    </html>
  );
}
