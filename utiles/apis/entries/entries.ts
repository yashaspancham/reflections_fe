import { apiReturnErrorT, oldEntryT } from "@/utiles/types";
import {
  errorReturnFunction,
  convertAllEntriesResposeToEntryType,
  convertAPIResponseTOldEntryT,
} from "../utils";
import api from "../interceptor";

const base_url = process.env.EXPO_PUBLIC_API_BASE_URL;

export const allEntries = async (
  userId: number
): Promise<oldEntryT[] | apiReturnErrorT> => {
  const api_url: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/user/${userId}`;
  try {
    const response = await api.get(api_url);
    const new_res: oldEntryT[] = convertAllEntriesResposeToEntryType(
      response.data.entries
    );
    return new_res;
  } catch (error: any) {
    return errorReturnFunction(error);
  }
};

//pageNumber starts from 0
export const getEntriesWithPagination = async (
  userId: number,
  pageNumber: number
) => {
  try {
    const api_url: string = `${base_url}/entries/user/user_id/${userId}/page_number/${pageNumber}`;
    const response = await api.get(api_url);
    return {
      message: "entries fetched successfully",
      success: true,
      data: convertAllEntriesResposeToEntryType(response.data.entries),
    };
  } catch (error: any) {
    console.log("error: ", error);
    return errorReturnFunction(error);
  }
};

export const getEntryById = async (
  entry_id: number
): Promise<oldEntryT | null> => {
  const api_url: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/entry/${entry_id}`;
  try {
    const response = await api.get(api_url);
    return convertAPIResponseTOldEntryT(response.data.entry);
  } catch (error: any) {
    console.log("error: ", error);
    return null;
  }
};

export const addEntry = async (
  user_id: number | null,
  title: string,
  content: string
): Promise<boolean | apiReturnErrorT> => {
  const api_url: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/add_entry/${user_id}`;
  try {
    await api.post(api_url, {
      title: title,
      content: content,
    });
    return true;
  } catch (error: any) {
    console.log("error: ", error);
    return errorReturnFunction(error);
  }
};
