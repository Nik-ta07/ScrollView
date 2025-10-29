import { API_CONFIG } from "../config/api";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

function withTimeout<T>(promise: Promise<T>, ms = API_CONFIG.TIMEOUT) {
  return new Promise<T>((resolve, reject) => {
    const id = setTimeout(() => reject(new Error("Request timed out")), ms);
    promise.then(
      (value) => {
        clearTimeout(id);
        resolve(value);
      },
      (error) => {
        clearTimeout(id);
        reject(error);
      }
    );
  });
}

export async function api<T>(
  path: string,
  options: {
    method?: HttpMethod;
    body?: unknown;
    headers?: Record<string, string>;
    query?: Record<string, string | number | boolean | undefined>;
  } = {}
): Promise<T> {
  const { method = "GET", body, headers = {}, query } = options;

  const q = query
    ?
      "?" +
        Object.entries(query)
          .filter(([, v]) => v !== undefined && v !== null)
          .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
          .join("&")
    : "";

  const url = `${API_CONFIG.BASE_URL}${path}${q}`;

  const res: Response = await withTimeout(
    fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
  );

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`);
  }
  const contentType = res.headers.get("content-type") || "";
  return contentType.includes("application/json")
    ? ((await res.json()) as T)
    : ((await res.text()) as unknown as T);
}


