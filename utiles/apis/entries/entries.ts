import axios from "axios";
import { oldEntryT } from "@/utiles/types";

export const allEntries = async (
  userId: number
): Promise<oldEntryT[] | any> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/user/${userId}`;
  try {
    const response = await axios.get(api);
    const new_res: oldEntryT[] = await convertAllEntriesResposeToEntryType(
      response.data.entries
    );
    return new_res;
  } catch (error: any) {
    console.log("error: ", error);
    if (error.response) {
      return {
        status:error.status,
        message: "Authentication failed",
      };
    } else if (error.request) {
      return {
        status:error.status,
        message: "No Response From Server, Check connection",
      };
    } else {
      return {
        status:error.status,
        message: "Unknown Error",
      };
    }
  }
};

const convertAllEntriesResposeToEntryType = async (
  allEntries: any[]
): Promise<oldEntryT[]> => {
  const new_array = allEntries.map((item) => ({
    entry_id: item["id"],
    datetime: new Date(item["created_at"]),
    entryContent: item["content"],
    entryTitle: item["title"],
  }));
  return new_array;
};

export const getEntryById = async (
  entry_id: number
): Promise<oldEntryT | null> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/entry/${entry_id}`;
  try {
    const response = await axios.get(api);
    return convertAPIResponseTOldEntryT(response.data.entry);
  } catch (error: any) {
    console.log("error: ", error);
    return null;
  }
};

const convertAPIResponseTOldEntryT = (apiResEntry: any): oldEntryT => {
  return {
    entry_id: apiResEntry.id,
    datetime: new Date(apiResEntry.created_at),
    entryTitle: apiResEntry.title,
    entryContent: apiResEntry.content,
  };
};

export const addEntry=async(user_id:number|null,title:string,content:string):Promise<boolean>=>{
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/add_entry/${user_id}`;
  try{
   await axios.post(api,{
    title:title,
    content:content
    });
    return true;
  }
  catch (error:any){
    console.log("error: ",error);
    return false;
  }
}