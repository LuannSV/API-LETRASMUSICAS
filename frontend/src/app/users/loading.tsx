export default function LoadingUsers() {
  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <div className="h-7 w-40 bg-muted rounded-md animate-pulse" />
      <div className="rounded-md border divide-y">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-4 space-y-2">
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
            <div className="h-3 w-64 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

