import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
  user_id: number | null;
  user_email: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
  user_id: null,
  user_email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin(
      state,
      action: PayloadAction<{ token: string; user_id: number; user_email: string }>
    ) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.user_id = action.payload.user_id;
      state.user_email = action.payload.user_email;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.user_id = null;
      state.user_email = null;
    },
    restoreSession(state, action: PayloadAction<string | null>) {
      state.isLoggedIn = !!action.payload;
      state.token = action.payload;
    },
  },
});

export const { setLogin, setLogout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
