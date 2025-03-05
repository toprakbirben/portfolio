import type { Metadata } from "next";
import AnimatedCursor from "react-animated-cursor"
import React from "react";
import "./globals.css";


export const metadata: Metadata = {
  title: "toprakbirben",
  description: "Portfolio for Toprak Birben",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnimatedCursor
          innerSize={8}
          outerSize={35}
          innerScale={1}
          outerScale={2}
          outerAlpha={0}
          innerStyle={{
            backgroundColor: 'var(--cursor-color)'
          }}
          outerStyle={{
            border: '3px solid var(--cursor-color)'
          }}
        />
        {children}
      </body>
    </html>
  );
}



