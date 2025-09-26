"use client";

import { useEffect } from "react";

export default function UsersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting
    // eslint-disable-next-line no-console
    console.error("Users page error:", error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
      <h2 className="text-xl font-semibold">Oops! Não foi possível carregar os usuários.</h2>
      <p className="text-sm text-gray-500">
        {error.message || "Tente novamente em instantes."}
      </p>
      <div className="pt-2">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

