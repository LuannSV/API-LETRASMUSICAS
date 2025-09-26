import { getUsers } from "@/lib/api";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-6">
      <div className="flex items-end justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Usuários</h1>
        <span className="text-xs text-gray-500">{users.length} resultados</span>
      </div>
      {users.length === 0 ? (
        <div className="text-center py-16 border rounded-lg">
          <p className="text-sm text-gray-500">Nenhum usuário encontrado.</p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {users.map((u) => (
            <li key={u.id} className="rounded-lg border p-4 shadow-sm bg-white/50 dark:bg-black/20">
              <div className="font-medium text-base">{u.name}</div>
              {u.email ? (
                <div className="text-sm text-gray-500 mt-1">{u.email}</div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

