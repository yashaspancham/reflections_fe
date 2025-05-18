import axios from "axios";

export const loginAPI = async (
  email: string,
  password: string
): Promise<any> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/login`;
  try {
    await axios.post(api, {
      email: email,
      password: password,
    });
    return {
      status: 200,
      success: true,
      message: "Login Successful",
      showPopUpMsg: true,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status:error.status,
        success: false,
        message: "Authentication failed",
        showPopUpMsg: false,
      };
    } else if (error.request) {
      return {
        status:error.status,
        success: false,
        message: "No Response From Server, Check connection",
        showPopUpMsg: true,
      };
    } else {
      return {
        status:error.status,
        success: false,
        message: "Unknown Error",
        showPopUpMsg: true,
      };
    }
  }
};