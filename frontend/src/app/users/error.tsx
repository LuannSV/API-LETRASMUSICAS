'use client'

export default function UsersError({ error }: { error: Error & { digest?: string } }) {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-4">
      <h1 className="text-2xl font-semibold">Erro ao carregar usuários</h1>
      <div className="rounded-md border border-red-200 bg-red-50 text-red-700 p-4">
        {error.message}
      </div>
      <button
        className="inline-flex items-center justify-center rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
        onClick={() => location.reload()}
      >
        Tentar novamente
      </button>
    </div>
  );
}

