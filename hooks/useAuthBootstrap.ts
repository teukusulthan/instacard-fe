"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { verifyToken } from "@/stores/auth.slice";
import { fetchMe } from "@/stores/user.slice";

export function useBootstrapAuth() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((s) => s.auth.userId);
  const status = useAppSelector((s) => s.auth.status);

  useEffect(() => {
    (async () => {
      try {
        if (!userId && status !== "loading") {
          const res = await dispatch(verifyToken()).unwrap();
          if (res) dispatch(fetchMe());
        }
      } catch {}
    })();
  }, [dispatch, userId, status]);
}
