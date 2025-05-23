import axios from "axios";
import { entryT } from "@/utiles/types";

export const allEntries = async (userId: number): Promise<entryT[] | null> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/entries/user/${userId}`;
  try {
    const response = await axios.get(api);
    const new_res: entryT[] = await convertAllEntriesResposeToEntryType(
      response.data.entries
    );
    return new_res;
  } catch (error: any) {
    console.log("error: ", error);
    return null;
  }
};

const convertAllEntriesResposeToEntryType = async (
  allEntries: any[]
): Promise<entryT[]> => {
  const new_array = allEntries.map((item) => ({
    datetime: item["created_at"],
    entryContent: item["content"],
    entryTitle: item["title"],
  }));
  console.log("new_array: ", new_array);
  return new_array;
};
