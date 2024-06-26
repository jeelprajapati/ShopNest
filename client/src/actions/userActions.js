import toast from "react-hot-toast";
import makeRequesInstance from "../makeRequest.js";
const makRequest = makeRequesInstance(null);

export const register = async (values, callback) => {
  try {
    const res = await makRequest.post("/auth/register", values);
    if (res.status === 201) {
      toast.success(res.data);
      callback();
    }
  } catch (error) {
    if (error?.response) {
      if (error.response.status === 500) {
        toast.error("User already exists!");
      }
    }
    toast.error(error.message);
  }
};

export const login = async (values, callback) => {
  try {
    const res = await makRequest.post("/auth/login", values);
    if (res.status === 200) {
      const { token, username, _id } = res.data;
      localStorage.setItem(
        "user",
        JSON.stringify({ username, token, userId: _id })
      );
      callback();
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};

export const changePassword = async (token, values, callback) => {
  try {
    const makeRequest = makeRequesInstance(token);
    const res = await makeRequest.post("/auth/changePassword", values);
    if (res.status === 201) {
      toast.success(res.data);
      callback();
    }
  } catch (error) {
    toast.error(error?.response?.data?.message);
  }
};
