import { getUsers } from "@/lib/api";

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Users</h1>
      {users.length === 0 ? (
        <p className="text-sm text-gray-500">No users found.</p>
      ) : (
        <ul className="divide-y divide-gray-200 border rounded-md">
          {users.map((u) => (
            <li key={u.id} className="p-4">
              <div className="font-medium">{u.name}</div>
              {u.email ? (
                <div className="text-sm text-gray-500">{u.email}</div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

