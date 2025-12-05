"use server";

import "server-only";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const RAW_BASE =
  process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || "/api/v1";

const API_BASE = RAW_BASE.replace(/\/$/, "");

export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
};

type ApiResponse<T> = {
  status: string;
  message?: string;
  data: T;
};

async function fetchJson<T>(input: string, init?: RequestInit): Promise<T> {
  const res = await fetch(input, { cache: "no-store", ...init });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getCurrentUser(): Promise<User | null> {
  try {
    const url = API_BASE.startsWith("http")
      ? `${API_BASE}/user/me`
      : `${API_BASE}/user/me`;

    const cookieHeader = cookies().toString();
    if (!cookieHeader) return null;

    const data = await fetchJson<ApiResponse<User>>(url, {
      method: "GET",
      headers: { cookie: cookieHeader },
    });

    return data.data;
  } catch {
    return null;
  }
}

export async function requireUser(): Promise<User> {
  const u = await getCurrentUser();
  if (!u) redirect("/login");
  return u;
}
