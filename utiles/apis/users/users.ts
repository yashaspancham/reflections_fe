import { errorReturnFunction } from "@/utiles/apis/utils";
import api from "../interceptor";

const base_url=process.env.EXPO_PUBLIC_API_BASE_URL;

export const getUserName = async (userId: number) => {
  const api_url = `${base_url}/users/getUserName/user_id/${userId}`;
  try {
    const response = await api.get(api_url);
    return {
      message: response.data.message,
      success: true,
      data: response.data.user,
    };
  } catch (error) {
    console.error("Error in getUserData:", error);
    return errorReturnFunction(error);
  }
};


export const getLongestStreak = async (userId: number) => {
  const api_url = `${base_url}/users/getLongestStreak/user_id/${userId}`;
  try {
    const response = await api.get(api_url);
    return {
      message: response.data.message,
      success: true,
      data: response.data.longestStreak,
    };
  } catch (error) {
    console.error("Error in getLongestStreak:", error);
    return errorReturnFunction(error);
  }
}

export const getTotalEntries = async (userId: number) => {
  const api_url = `${base_url}/users/getTotalEntries/user_id/${userId}`;
  try {
    const response = await api.get(api_url);
    return {
      message: response.data.message,
      success: true,
      data: response.data.totalEntries,
    };
  } catch (error) {
    console.error("Error in getTotalEntries:", error);
    return errorReturnFunction(error);
  }
}