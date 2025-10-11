"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { verifySession } from "@/stores/auth.slice";
import { fetchMe } from "@/stores/user.slice";

export function useBootstrapAuth() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.auth.status);
  const authUser = useAppSelector((s) => s.auth.user);
  const me = useAppSelector((s) => s.user.me);

  useEffect(() => {
    if ((status === "idle" || status === "error") && !authUser) {
      (async () => {
        try {
          const user = await dispatch(verifySession()).unwrap();
          if (user && !me) {
            dispatch(fetchMe());
          }
        } catch {}
      })();
    }
  }, [dispatch, status, authUser, me]);
}
