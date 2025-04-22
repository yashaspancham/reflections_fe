import { entryT } from "./types";

export const findEntryBasedOnDatetime = (
  datetime: Date,
  entries: entryT[]
):entryT | undefined => {
    // console.log("datetime: ",datetime);
    for(let i=0;i<entries.length;i++){
        // console.log("entry: ",entries[i]);
        if (new Date(entries[i].datetime).getTime() === datetime.getTime()){            
            return entries[i];
        };
    };
};