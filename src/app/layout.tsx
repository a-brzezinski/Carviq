import "./globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Navigation } from "@/components/navigation/Navigation";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    template: "%s | Carviq",
    default: "Carviq",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={`${inter.variable} antialiased`}>
          <Navigation />
          <main className="container mx-auto min-h-screen px-2">{children}</main>
          <Toaster richColors/>
        </body>
      </ReactQueryProvider>
    </html>
  );
}
