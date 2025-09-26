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
  title: {
    default: "Letras de Músicas",
    template: "%s – Letras",
  },
  description: "Busque letras de músicas e visualize usuários",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-dvh flex flex-col">
          <header className="border-b bg-card">
            <nav className="max-w-5xl mx-auto flex items-center justify-between p-4">
              <Link href="/" className="font-semibold tracking-tight">Letras</Link>
              <div className="flex items-center gap-4 text-sm">
                <Link href="/" className="hover:underline">Início</Link>
                <Link href="/users" className="hover:underline">Usuários</Link>
              </div>
            </nav>
          </header>
          <main className="max-w-5xl mx-auto w-full p-4 flex-1">{children}</main>
          <footer className="border-t text-sm text-muted-foreground bg-card">
            <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
              <span>© {new Date().getFullYear()} Letras</span>
              <span className="hidden sm:inline">Feito com Next.js 15 + Tailwind</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
