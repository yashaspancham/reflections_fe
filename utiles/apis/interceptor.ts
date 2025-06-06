import axios from "axios";
import { store } from "../redux/store";
import { setLogout } from "../redux/store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_UR,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setLogout());
      await AsyncStorage.removeItem("persist:root");
    }
    return Promise.reject(error);
  }
);

export default api;