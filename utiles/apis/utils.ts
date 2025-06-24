import { apiReturnErrorT } from "../types";
import { oldEntryT } from "../types";


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


export const convertAllEntriesResposeToEntryType =  (
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
