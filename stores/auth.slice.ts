import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "@/types/auth";
import {
  loginRequest,
  verifyRequest,
  logoutRequest,
} from "@/services/auth.services";
import type { User } from "@/services/user.services";

type ApiEnvelope<T> = {
  status?: string;
  message?: string;
  data?: unknown;
  user?: unknown;
} & Record<string, unknown>;

function unwrap<T>(raw: unknown): T {
  const r = raw as ApiEnvelope<T> | T;
  if (r && typeof r === "object") {
    if ("user" in r && (r as any).user) return (r as any).user as T;
    if ("data" in r && (r as any).data) return (r as any).data as T;
  }
  return r as T;
}

export type AuthState = {
  user: User | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
};

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

/** Verify */
export const verifySession = createAsyncThunk<User>(
  "auth/verifySession",
  async (_, { rejectWithValue }) => {
    try {
      const res = await verifyRequest();
      const user = unwrap<User>(res.data);
      if (!user || !user.id) throw new Error("Invalid verify response");
      return user;
    } catch (e: any) {
      return rejectWithValue(e?.message || "Verify failed");
    }
  }
);

/** Login */
export const loginAndVerify = createAsyncThunk<
  User,
  LoginPayload,
  { rejectValue: string }
>("auth/loginAndVerify", async (payload, { rejectWithValue }) => {
  try {
    await loginRequest(payload);
    const verified = await verifyRequest();
    const user = unwrap<User>(verified.data);
    if (!user || !user.id) throw new Error("Invalid verify response");
    return user;
  } catch (e: any) {
    const msg = e instanceof Error ? e.message : String(e);
    return rejectWithValue(msg);
  }
});

/** Logout sederhana. */
export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutRequest();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // verifySession
    builder
      .addCase(verifySession.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(verifySession.fulfilled, (s, a: PayloadAction<User>) => {
        s.status = "authenticated";
        s.user = a.payload;
      })
      .addCase(verifySession.rejected, (s, a) => {
        s.status = "error";
        s.error = (a.payload as string) ?? a.error.message ?? "Verify failed";
        s.user = null;
      });

    // loginAndVerify
    builder
      .addCase(loginAndVerify.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginAndVerify.fulfilled, (s, a: PayloadAction<User>) => {
        s.status = "authenticated";
        s.user = a.payload;
      })
      .addCase(loginAndVerify.rejected, (s, a) => {
        s.status = "error";
        s.error = (a.payload as string) ?? a.error.message ?? "Login failed";
        s.user = null;
      });

    // logout
    builder.addCase(logout.fulfilled, (s) => {
      s.user = null;
      s.status = "idle";
      s.error = null;
    });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectUser = (s: { auth: AuthState }) => s.auth.user;
export const selectUserId = (s: { auth: AuthState }) => s.auth.user?.id ?? null; // kompatibel
export const selectAuthStatus = (s: { auth: AuthState }) => s.auth.status;
export const selectAuthError = (s: { auth: AuthState }) => s.auth.error;
export const selectIsAuthenticated = (s: { auth: AuthState }) =>
  s.auth.status === "authenticated" && !!s.auth.user?.id;
