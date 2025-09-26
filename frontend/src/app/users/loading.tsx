export default function UsersLoading() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="h-7 w-40 bg-gray-200 rounded-md animate-pulse" />
      <ul className="divide-y divide-gray-200 border rounded-md">
        {Array.from({ length: 5 }).map((_, idx) => (
          <li key={idx} className="p-4 space-y-2">
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-64 bg-gray-100 rounded animate-pulse" />
          </li>
        ))}
      </ul>
    </div>
  );
}

