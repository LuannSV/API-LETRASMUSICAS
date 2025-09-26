import { ApiError, API_BASE_URL, getUsers } from "@/lib/api";

export default async function UsersPage() {
  let users: Awaited<ReturnType<typeof getUsers>> = [];
  let errorMessage: string | null = null;

  try {
    users = await getUsers();
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      errorMessage = `Erro ${err.status}: ${err.body || err.statusText}`;
    } else {
      errorMessage = (err as Error)?.message || "Falha ao buscar usuários";
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Usuários</h1>
        <span className="text-xs text-muted-foreground">Fonte: {process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL}</span>
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-200 bg-red-50 text-red-700 p-4">
          {errorMessage}
        </div>
      ) : null}

      {!errorMessage && users.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum usuário encontrado.</p>
      ) : null}

      {!errorMessage && users.length > 0 ? (
        <ul className="divide-y divide-border border rounded-md overflow-hidden">
          {users.map((u) => (
            <li key={u.id} className="p-4">
              <div className="font-medium">{u.name}</div>
              {u.email ? (
                <div className="text-sm text-muted-foreground">{u.email}</div>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

