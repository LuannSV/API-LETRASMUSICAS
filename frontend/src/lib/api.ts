export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const DEFAULT_TIMEOUT_MS = 10000;

export async function apiFetch<T = Json>(
  path: string,
  init: RequestInit & { timeoutMs?: number } = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;

  const headers = new Headers(init.headers);
  // Default accept JSON; preserve user override
  if (!headers.has("Accept")) headers.set("Accept", "application/json, text/plain;q=0.8, */*;q=0.5");
  if (!headers.has("Content-Type") && init.body) {
    headers.set("Content-Type", "application/json");
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), init.timeoutMs ?? DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      // Avoid caching on the server unless explicitly requested
      cache: init.cache ?? "no-store",
      // Preserve Next.js specific options if provided via init as any
      // @ts-expect-error allow next option passthrough
      next: (init as any).next ?? { revalidate: 0 },
      ...init,
      headers,
      signal: init.signal ?? controller.signal,
    });

    if (!response.ok) {
      const errorDetail = await readErrorDetail(response);
      const method = (init as any).method || "GET";
      throw new Error(
        `${method} ${url} -> ${response.status} ${response.statusText}${errorDetail ? `: ${errorDetail}` : ""}`
      );
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as T;
    }
    return (await response.text()) as unknown as T;
  } catch (err: unknown) {
    if ((err as any)?.name === "AbortError") {
      throw new Error(`Request timed out after ${init.timeoutMs ?? DEFAULT_TIMEOUT_MS}ms: ${url}`);
    }
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Network/Fetch error while requesting ${url}: ${message}`);
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

async function readErrorDetail(response: Response): Promise<string> {
  const contentType = response.headers.get("content-type") || "";
  try {
    if (contentType.includes("application/json")) {
      const data = await response.json();
      if (data && typeof data === "object") {
        const maybeMessage = (data as any).message || (data as any).error || (data as any).detail;
        if (typeof maybeMessage === "string") return maybeMessage;
      }
      return JSON.stringify(data);
    }
    return await safeReadText(response);
  } catch {
    return "<failed-to-read-error-body>";
  }
}

export type User = {
  id: string | number;
  name: string;
  email?: string;
};

export async function getUsers(): Promise<User[]> {
  const data = await apiFetch<unknown>("/users");
  // Accept several common response shapes
  if (Array.isArray(data)) return data as User[];
  if (data && typeof data === "object") {
    const obj = data as Record<string, unknown>;
    if (Array.isArray(obj.users)) return obj.users as User[];
    if (Array.isArray(obj.data)) return obj.data as User[];
  }
  throw new Error("Unexpected users response shape");
}

