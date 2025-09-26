import Link from "next/link";

export default function Home() {
  return (
    <section className="py-10 sm:py-14 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-5 md:space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Frontend Next.js + Tailwind
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Template inicial com navegação, tema claro/escuro, páginas exemplo e utilitários.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/users"
                className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 text-sm font-medium transition-colors hover:bg-black/85 dark:hover:bg-white/90"
              >
                Ver usuários
              </Link>
              <a
                href="https://nextjs.org/docs"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-md border border-black/10 dark:border-white/15 px-4 py-2.5 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
              >
                Documentação
              </a>
            </div>
          </div>
          <div className="aspect-video rounded-xl border border-black/10 dark:border-white/15 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30" />
        </div>
      </div>
    </section>
  );
}
