export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export async function apiFetch<T = Json>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

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

export type LyricsResponse = {
  banda: string;
  musica: string;
  letra: string;
};

export async function getUsers(): Promise<User[]> {
  return apiFetch<User[]>("/users");
}

export async function getLyrics(banda: string, musica: string): Promise<LyricsResponse> {
  const params = new URLSearchParams({
    banda: banda,
    musica: musica
  });
  return apiFetch<LyricsResponse>(`/lyrics?${params}`);
}

