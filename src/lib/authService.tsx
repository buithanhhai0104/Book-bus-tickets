import axios from "axios";
interface ILoginData {
  username: string;
  password: string;
}

interface IRegisterData {
  name: string;
  email: string;
  username: string;
  password: string;
}

export const apiLogin = async (loginData: ILoginData) => {
  try {
    const response = await axios.post(
      "http://localhost:4000/auth/login",
      loginData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error("Axios error:", err.message);
      throw new Error(err.response?.data?.message || "Lỗi từ server");
    } else {
      console.error("Unexpected error:", err);
      throw new Error("Lỗi không xác định");
    }
  }
};

export const apiRegister = async (registerData: IRegisterData) => {
  try {
    const respone = await axios.post(
      "http://localhost:4000/auth/register",
      registerData,
      {
        withCredentials: true,
      }
    );
    return respone.data;
  } catch (err) {
    console.log(err);
  }
};

export const getUser = async () => {
  try {
    const response = await axios.get("http://localhost:4000/userinfo", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log("Xác thực không thành công", err);
  }
};
