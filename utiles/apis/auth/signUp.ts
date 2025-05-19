import axios from "axios";

export const signUpAPI = async (
  email: string,
  password: string
): Promise<any> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/signup`;
  try {
    const res = await axios.post(api, {
      email: email,
      password: password,
    });
    if (res.status === 200) {
      return {
        status: res.status,
        success: false,
        message: "Account Exists",
        showPopUpMsg: true,
      };
    }
    if (res.status === 201) {
      return {
        status: res.status,
        success: true,
        message: "Account Created",
        showPopUpMsg: true,
      };
    }
  } catch (error: any) {
    if (error.response) {
      return {
        status: error.status,
        success: false,
        message: "signup failed",
        showPopUpMsg: false,
      };
    } else if (error.request) {
      return {
        status: error.status,
        success: false,
        message: "No Response From Server, Check connection",
        showPopUpMsg: true,
      };
    } else {
      return {
        status: error.status,
        success: false,
        message: "Unknown Error",
        showPopUpMsg: true,
      };
    }
  }
};
