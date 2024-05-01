const OrderProduct = require("../models/OrderProduct");
const JwtService = require("./JwtService");

const createOrderProduct = (newOrder) => {
  return new Promise(async (resolve, reject) => {
    console.log(newOrder)
    const {
      orderItems,
      fullName,
      phone,
      address,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      user
    } = newOrder;

    try {
      const createdProduct = await OrderProduct.create({
        orderItems,
        shippingAddress: {
          fullName,
          address,
          phone
        },
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        user
      });

      if (createdProduct) {
        resolve({
          status: "OK",
          message: "Success",
          data: createdProduct,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createOrderProduct
};
