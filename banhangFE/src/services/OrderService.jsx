import { axiosJWT } from "./UserService";

// export const createOrderProduct = async (data) => {
//   const res = await axios.post(
//     `${import.meta.env.VITE_SOME_KEY_URL}/product/create`,
//     data
//   );
//   return res.data;
// };

export const createOrderProduct = async (access_token,data) => {
  const res = await axiosJWT.post(
    `${import.meta.env.VITE_SOME_KEY_URL}/order/create`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
