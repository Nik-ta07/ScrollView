import { api } from "./apiClient";

export type AuthUser = { id: number; email: string; name: string };

export async function register(payload: { email: string; name: string; password: string }): Promise<{ user: AuthUser }> {
  return api<{ user: AuthUser }>(`/auth/register`, { method: "POST", body: payload });
}

export async function login(payload: { email: string; password: string }): Promise<{ token: string; user: AuthUser }> {
  return api<{ token: string; user: AuthUser }>(`/auth/login`, { method: "POST", body: payload });
}


