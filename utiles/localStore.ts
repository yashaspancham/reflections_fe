import AsyncStorage from "@react-native-async-storage/async-storage";
import {entryT} from "./types"


export const saveToStorage = async (data: entryT) => {
    try { 
      const stored = await AsyncStorage.getItem('entries#1234');
      if(stored===null){
        const jsonValue = JSON.stringify([data]);
        await AsyncStorage.setItem("entries#1234", jsonValue);
        return true;
      }
      const parsedStored=await JSON.parse(stored);
      const newJsonValue = JSON.stringify([data,...parsedStored]);
      await AsyncStorage.setItem("entries#1234",newJsonValue);
      return true;
    } catch (e) {
      console.error('Error saving data:', e);
      return false;
    }
  }