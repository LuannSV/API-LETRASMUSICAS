import type { Metadata } from "next";
import Link from "next/link";
// Removi Geist e Geist_Mono para simplificar, mas você pode mantê-los se preferir.
// O importante é como as classes são aplicadas no `body`.
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Frontend Agradável",
  description: "App frontend com um layout aprimorado",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      {/* 1. Fundo suave e cor de texto principal menos dura */}
      <body className={`${fontSans.variable} bg-slate-50 font-sans text-slate-800 antialiased`}>

        {/* 2. Header moderno, fixo e com detalhes visuais */}
        <header id="main-header" className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <nav id="main-navigation" className="mx-auto flex max-w-5xl items-center justify-between p-4">
            <Link href="/" className="text-lg font-bold text-slate-900">
              MeuSite
            </Link>
            
            {/* 3. Links com mais hierarquia e feedback visual no hover */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Home
              </Link>
              <Link
                href="/users"
                className="font-medium text-slate-600 transition-colors hover:text-slate-900"
              >
                Users
              </Link>
            </div>
          </nav>
        </header>

        {/* 4. Conteúdo principal com mais espaçamento vertical */}
        <main id="main-content" className="mx-auto max-w-5xl p-4 py-8 md:py-12">
          {children}
        </main>

      </body>
    </html>
  );
}