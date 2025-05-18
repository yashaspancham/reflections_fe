import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthState = {
  isLoggedIn: boolean;
  token: string | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action: PayloadAction<string>) {
      state.isLoggedIn = true;
      state.token = action.payload;
      AsyncStorage.setItem('project_y_token5321', action.payload);
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.token = null;
      AsyncStorage.removeItem('project_y_token5321');
    },
    restoreSession(state, action: PayloadAction<string | null>) {
      state.isLoggedIn = !!action.payload;
      state.token = action.payload;
    },
  },
});

export const { setLogin, setLogout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
