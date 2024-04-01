import axios from "axios";

export const loginUser = async (data) => {
    const res = await axios.post(`${import.meta.env.VITE_SOME_KEY_URL}/user/sign-in`,data);
      return res.data;
}

export const signUpUser = async (data) => {
  const res = await axios.post(`${import.meta.env.VITE_SOME_KEY_URL}/user/sign-up`,data);
    return res.data;
}