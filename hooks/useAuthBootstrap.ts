"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { getMe, setBootstrapped } from "@/stores/auth.slice";

const RESERVED = new Set([
  "",
  "login",
  "register",
  "forgot-password",
  "dashboard",
  "settings",
  "account",
]);

function isAuthPage(p: string) {
  return p === "/login" || p === "/register" || p === "/forgot-password";
}
function isSingleSegmentPublic(p: string) {
  const segs = p.split("/").filter(Boolean);
  return segs.length === 1 && !RESERVED.has(segs[0]);
}

export function useBootstrapAuth() {
  const dispatch = useAppDispatch();
  const bootstrapped = useAppSelector((s) => s.auth.bootstrapped);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = window.location.pathname;

    if (isAuthPage(p) || isSingleSegmentPublic(p)) return;

    if (!bootstrapped) {
      dispatch(getMe());
      dispatch(setBootstrapped(true));
    }
  }, [bootstrapped, dispatch]);
}
