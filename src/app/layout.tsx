import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { MotionConfig } from "motion/react";
import React from "react";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const displaySans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});
const utilityMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Sarp Toprak Birben — Software Engineer",
  description:
    "Backend-focused software engineer building scalable systems end to end. Amsterdam, Netherlands.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${displaySans.variable} ${utilityMono.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" sizes="any" />
      </head>
      <body>
        <MotionConfig reducedMotion="user">
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionConfig>
      </body>
    </html>
  );
}
