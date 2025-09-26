"use client";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="rounded-md border border-red-200/60 dark:border-red-500/30 bg-red-50 dark:bg-red-950/20 p-4">
        <div className="font-semibold text-red-700 dark:text-red-300">Erro ao carregar usuários</div>
        <div className="text-sm text-red-700/80 dark:text-red-300/80 mt-1 break-all">
          {error.message}
        </div>
        <div className="text-xs text-red-700/70 dark:text-red-300/70 mt-2">Tente novamente mais tarde.</div>
      </div>
    </div>
  );
}

