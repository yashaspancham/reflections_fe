import { errorReturnFunction } from "@/utiles/apis/utils";
import api from "../interceptor";

export const getUserData=async (userId: number) => {
    const api_url=`${process.env.EXPO_PUBLIC_API_BASE_URL}/users/getUserData/user_id/${userId}`;
    try{
    console.log(`/users/getUserData/user_id/${userId}`);
    const response = await api.get(api_url);
    console.log("response: ",response);
    return response;
}
catch (error) {
    console.error("Error in getUserData:", error);
        return errorReturnFunction(error);
    }
}