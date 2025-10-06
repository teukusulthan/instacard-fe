import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoginPayload } from "@/types/auth";
import {
  loginRequest,
  verifyRequest,
  logoutRequest,
} from "@/services/auth.services";

export type AuthState = {
  userId: string | null;
  status: "idle" | "loading" | "authenticated" | "error";
  error: string | null;
};

const initialState: AuthState = {
  userId: null,
  status: "idle",
  error: null,
};

export const verifyToken = createAsyncThunk<string>(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const res = await verifyRequest();
      return res.data.id;
    } catch (e: any) {
      return rejectWithValue(e?.message || "Verify failed");
    }
  }
);

export const loginAndVerify = createAsyncThunk<
  string,
  LoginPayload,
  { rejectValue: string }
>("auth/loginAndVerify", async (payload, { rejectWithValue }) => {
  try {
    await loginRequest(payload);
    const verified = await verifyRequest();
    const id = verified.data.id;
    if (!id) throw new Error("Invalid verify response");
    return id;
  } catch (e: any) {
    const msg = e instanceof Error ? e.message : String(e);
    return rejectWithValue(msg);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await logoutRequest();
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth(state) {
      state.userId = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyToken.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(verifyToken.fulfilled, (s, a: PayloadAction<string>) => {
        s.status = "authenticated";
        s.userId = a.payload;
      })
      .addCase(verifyToken.rejected, (s, a) => {
        s.status = "error";
        s.error = (a.payload as string) ?? a.error.message ?? "Verify failed";
        s.userId = null;
      })
      .addCase(loginAndVerify.pending, (s) => {
        s.status = "loading";
        s.error = null;
      })
      .addCase(loginAndVerify.fulfilled, (s, a: PayloadAction<string>) => {
        s.status = "authenticated";
        s.userId = a.payload;
      })
      .addCase(loginAndVerify.rejected, (s, a) => {
        s.status = "error";
        s.error = (a.payload as string) ?? a.error.message ?? "Login failed";
        s.userId = null;
      })
      .addCase(logout.fulfilled, (s) => {
        s.userId = null;
        s.status = "idle";
        s.error = null;
      });
  },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectUserId = (s: { auth: AuthState }) => s.auth.userId;
export const selectAuthStatus = (s: { auth: AuthState }) => s.auth.status;
export const selectAuthError = (s: { auth: AuthState }) => s.auth.error;
export const selectIsAuthenticated = (s: { auth: AuthState }) =>
  s.auth.status === "authenticated" && !!s.auth.userId;
