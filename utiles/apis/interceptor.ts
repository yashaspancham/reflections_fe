import axios from "axios";
import { store } from "../redux/store";
import { setLogout } from "../redux/store/slices/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { oldEntryT } from "../types";
import {convertAPIResponseTOldEntryT} from "./utils"

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_UR,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.method === "get") {
      console.log("req Side: ", config);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    storeCache(response);
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(setLogout());
      await AsyncStorage.removeItem("persist:root");
    }
    return Promise.reject(error);
  }
);


const storeCache = (response: any) => {
  if (response.config.method !== "get") return;
  const url = response.config.url;
  const api_object = url.split("/")[url.split("/").length - 3];
  const api_sub_object = url.split("/")[url.split("/").length - 2];
  if (api_object !== "entries" || api_sub_object !== "entry") return;
  const entry_id_key="entry_id_"+url.split("/")[url.split("/").length - 1];
  console.log("response.data: ", response.data);
  storeInAsyncStorage(entry_id_key,convertAPIResponseTOldEntryT(response.data.entry));
};

const storeInAsyncStorage = async (key: string, value: any) => {
  console.log("key: ", key);
  console.log("value: ", value);
  const jsonValue=JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
}

export default api;