import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <section className="relative overflow-hidden rounded-[var(--radius-lg)] border bg-card p-8 sm:p-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Letras de Músicas</h1>
          <p className="mt-3 text-base text-muted-foreground">
            Busque letras por artista e música. Veja também uma lista de usuários de exemplo.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-ring)]"
              href="/users"
            >
              Ver usuários
            </Link>
            <a
              className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium hover:bg-muted"
              href="https://lyrics.ovh/"
              target="_blank"
              rel="noopener noreferrer"
            >
              API de letras
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
      </section>

      <section className="mt-10 grid gap-4 sm:grid-cols-3">
        <div className="rounded-md border bg-card p-4">
          <h3 className="font-semibold">Rápido</h3>
          <p className="mt-1 text-sm text-muted-foreground">Next.js 15 com streaming e layouts.</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <h3 className="font-semibold">Estilizado</h3>
          <p className="mt-1 text-sm text-muted-foreground">Design tokens com Tailwind v4.</p>
        </div>
        <div className="rounded-md border bg-card p-4">
          <h3 className="font-semibold">Tipado</h3>
          <p className="mt-1 text-sm text-muted-foreground">TypeScript para segurança e DX.</p>
        </div>
      </section>
    </div>
  );
}
