import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontend",
  description: "App frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b bg-white/60 dark:bg-black/30 backdrop-blur supports-[backdrop-filter]:bg-white/50 sticky top-0 z-10">
          <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
            <div className="flex items-center gap-6">
              <Link href="/" className="font-semibold tracking-tight">App</Link>
              <Link href="/users" className="text-sm text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white">Usuários</Link>
            </div>
            <div className="text-xs text-gray-500">Frontend</div>
          </nav>
        </header>
        <main className="max-w-5xl mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
