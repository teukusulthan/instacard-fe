import { api } from "@/lib/api";

export type User = {
  id: string;
  email: string;
  username: string;
  name: string;
  bio: string | null;
  avatar: string | null;
  banner: string | null;
  theme: { mode: "light" | "dark"; accent: string };
  counts: { links: number; clicks: number };
};

export async function getMeById(id: string) {
  const res = await api.get(`/user/me/${id}`);
  return res.data;
}
