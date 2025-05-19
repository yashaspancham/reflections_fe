import axios from "axios";

export const loginAPI = async (
  email: string,
  password: string
): Promise<any> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}/auth/login`;
  try {
    const result=await axios.post(api, {
      email: email,
      password: password,
    });
    return {
      status: 200,
      message: "Login Successful",
      showPopUpMsg: true,
      token:result.data.token,
      userData:result.data.user,
    };
  } catch (error: any) {
    if (error.response) {
      return {
        status:error.status,
        message: "Authentication failed",
        showPopUpMsg: false,
        token:""
      };
    } else if (error.request) {
      return {
        status:error.status,
        message: "No Response From Server, Check connection",
        showPopUpMsg: true,
        token:""
      };
    } else {
      return {
        status:error.status,
        message: "Unknown Error",
        showPopUpMsg: true,
        token:""
      };
    }
  }
};