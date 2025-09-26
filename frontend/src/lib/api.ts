export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export class ApiError extends Error {
  status: number;
  statusText: string;
  body: string;

  constructor(message: string, status: number, statusText: string, body: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
    this.body = body;
  }
}

export async function apiFetch<T = Json>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || API_BASE_URL).replace(/\/+$/, "");
  const normalizedPath = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  const headers = new Headers(init.headers);

  // Default Accept header for APIs
  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json, text/plain;q=0.9, */*;q=0.8");
  }

  // Only set JSON Content-Type when body is a JSON string or plain object
  const bodyIsFormData = typeof FormData !== "undefined" && init.body instanceof FormData;
  const hasBody = typeof init.body !== "undefined" && init.body !== null;
  if (!headers.has("Content-Type") && hasBody && !bodyIsFormData) {
    headers.set("Content-Type", "application/json");
  }

  // Abort on timeout to avoid hanging requests
  const controller = new AbortController();
  const timeoutMs = typeof (init as any).timeout === "number" ? (init as any).timeout : 10000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(normalizedPath, {
      cache: "no-store",
      ...init,
      headers,
      signal: init.signal ?? controller.signal,
    });

    if (!response.ok) {
      const errorText = await safeReadText(response);
      throw new ApiError(
        `Request failed ${response.status} ${response.statusText}`,
        response.status,
        response.statusText,
        errorText
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.toLowerCase().includes("json")) {
      return (await response.json()) as T;
    }
    return (await response.text()) as unknown as T;
  } catch (err: unknown) {
    if (err instanceof ApiError) {
      throw err;
    }
    if ((err as any)?.name === "AbortError") {
      throw new Error("Request timed out");
    }
    throw new Error((err as Error)?.message || "Network error");
  } finally {
    clearTimeout(timeout);
  }
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

