import { apiReturnErrorT } from "../types";
import { oldEntryT } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const errorReturnFunction = (error: any): apiReturnErrorT => {
  console.log("error: ", error);
  if (error.response) {
    return {
      status: error.status,
      message: "api failed",
      success: false,
    };
  } else if (error.request) {
    return {
      status: error.status,
      message: "No Response From Server, Check connection",
      success: false,
    };
  } else {
    return {
      status: error.status,
      message: "Unknown Error",
      success: false,
    };
  }
};

export const convertAllEntriesResposeToEntryType = (
  allEntries: any[]
): oldEntryT[] => {
  const new_array = allEntries.map((item) => ({
    entry_id: item["id"],
    datetime: new Date(item["created_at"]),
    entryContent: item["content"],
    entryTitle: item["title"],
  }));
  return new_array;
};

export const convertAPIResponseTOldEntryT = (apiResEntry: any): oldEntryT => {
  return {
    entry_id: apiResEntry.id,
    datetime: new Date(apiResEntry.created_at),
    entryTitle: apiResEntry.title,
    entryContent: apiResEntry.content,
  };
};

export const storeCache = (response: any) => {
  if (response.config.method !== "get") return;
  const url = response.config.url;
  const api_object = url.split("/")[url.split("/").length - 3];
  const api_sub_object = url.split("/")[url.split("/").length - 2];
  if (api_object !== "entries" || api_sub_object !== "entry") return;
  const entry_id_key =
    "cache_entry_id_" + url.split("/")[url.split("/").length - 1];
  const entry = convertAPIResponseTOldEntryT(response.data.entry);
  storeInAsyncStorage(entry_id_key, entry);
};

export const storeInAsyncStorage = async (key: string, value: any) => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(key, jsonValue);
};

export const cacheHit = async (key: string): Promise<oldEntryT | null> => {
  const value = await AsyncStorage.getItem(key);
  if (!value) return null;
  const entry = JSON.parse(value);
  entry.datetime = new Date(entry.datetime);
  return entry;
};
