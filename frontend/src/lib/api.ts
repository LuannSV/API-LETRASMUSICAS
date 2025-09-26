export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export async function apiFetch<T = Json>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  let url: string;
  
  if (path.startsWith("http")) {
    url = path;
  } else if (API_BASE_URL) {
    url = `${API_BASE_URL}${path}`;
  } else {
    // Para requisições internas no Next.js
    const baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000';
    url = `${baseUrl}${path}`;
  }

  const headers = new Headers(init.headers);
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(url, { ...init, headers });

  if (!response.ok) {
    const errorText = await safeReadText(response);
    throw new Error(
      `Request failed ${response.status} ${response.statusText}: ${errorText}`
    );
  }

  // Try parse JSON; fall back to text
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await response.json()) as T;
  }
  return (await response.text()) as unknown as T;
}

async function safeReadText(response: Response): Promise<string> {
  try {
    return await response.text();
  } catch {
    return "<no-body>";
  }
}

export type User = {
  id: string | number;
  name: string;
  email?: string;
};

export async function getUsers(): Promise<User[]> {
  return apiFetch<User[]>("/api/users");
}

