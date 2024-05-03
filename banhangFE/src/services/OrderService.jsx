import { axiosJWT } from "./UserService";

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

export const getOrderByUserId = async (access_token,id) => {
  const res = await axiosJWT.get(`${import.meta.env.VITE_SOME_KEY_URL}/order/get-order-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
