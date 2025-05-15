import axios from "axios";

export const loginAPI = async (
  email: string,
  password: string
): Promise<boolean> => {
  const api: string = `${process.env.EXPO_PUBLIC_API_BASE_URL}login`;
  console.log("email: ", email);
  console.log("password: ", password);
  try {
    await axios.post(api, {
      email: email,
      password: password,
    });
    return true;
  } catch (error) {
    console.log("error in loginAPI: ", error);
    return false;
  }
};
