import type { AxiosError } from "axios";
import type { ApiResponse } from "@/types/api";
import { api } from "@/lib/api";
import { Link } from "@/types/link";
import { createLinkPayload } from "@/types/link";

const getErrMsg = (e: unknown, fallback: string) => {
  const err = e as AxiosError<any>;
  return (err.response?.data?.message as string) ?? err.message ?? fallback;
};

export async function createLinkRequest(body: createLinkPayload) {
  try {
    const res = await api.post<ApiResponse<Link>>("/link", body);
    return res.data;
  } catch (e) {
    throw new Error(getErrMsg(e, "Failed to create link"));
  }
}

export async function deleteLinkRequest(id: string) {
  try {
    const res = await api.delete<ApiResponse<null>>(`/link/${id}`);
    return res.data;
  } catch (e) {
    throw new Error(getErrMsg(e, "Failed to delete link"));
  }
}
