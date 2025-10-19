import { api } from "@/lib/api";

/* Types */
export type SocialPlatform =
  | "instagram"
  | "tiktok"
  | "x"
  | "linkedin"
  | "youtube"
  | "github";

export type SocialLink = {
  id: string;
  user_id: string;
  platform: SocialPlatform;
  username: string;
  url: string;
  order_index: number | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type ApiEnvelope<T> = {
  status: "success" | "error" | string;
  message: string;
  data: T;
  meta?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasPrev: boolean;
    hasNext: boolean;
    sortBy: "created_at" | "order_index";
    order: "asc" | "desc";
  };
};

export type GetSocialsParams = {
  page?: number;
  limit?: number;
  sort?: "created" | "order";
  order?: "asc" | "desc";
};

export async function getSocials(params: GetSocialsParams = {}) {
  const qs = new URLSearchParams();
  if (params.page) qs.set("page", String(params.page));
  if (params.limit) qs.set("limit", String(params.limit));
  if (params.sort) qs.set("sort", params.sort);
  if (params.order) qs.set("order", params.order);

  const url = `/social${qs.toString() ? `?${qs.toString()}` : ""}`;
  const res = await api.get<ApiEnvelope<SocialLink[]>>(url);
  return res.data;
}

export type UpsertSocialInput = {
  platform: SocialPlatform | string;
  username: string;
};

export async function upsertSocial(input: UpsertSocialInput) {
  const res = await api.put<ApiEnvelope<SocialLink>>(`/social`, input);
  return res.data;
}

export async function updateSocialOrder(id: string, order_index: number) {
  const res = await api.patch<ApiEnvelope<SocialLink>>(`/social/${id}/order`, {
    order_index,
  });
  return res.data;
}

export async function restoreSocial(id: string) {
  const res = await api.patch<ApiEnvelope<SocialLink>>(`/social/${id}/restore`);
  return res.data;
}

export async function deleteSocial(id: string) {
  const { data } = await api.delete<ApiEnvelope<SocialLink>>(
    `/social/${encodeURIComponent(id.trim())}`
  );
  return data;
}
