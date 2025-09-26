export const dynamic = 'force-dynamic';
import { getUsers } from "@/lib/api";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <section className="py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold">Users</h1>
          <div className="text-xs sm:text-sm text-gray-500">
            {users.length} resultado{users.length === 1 ? "" : "s"}
          </div>
        </div>
        {users.length === 0 ? (
          <p className="text-sm text-gray-500">No users found.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((u) => (
              <li key={u.id} className="rounded-lg border border-black/10 dark:border-white/15 p-4">
                <div className="font-medium text-base">{u.name}</div>
                {u.email ? (
                  <div className="text-sm text-gray-500 mt-1">{u.email}</div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

