import { apiReturnErrorT } from "../types";

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
