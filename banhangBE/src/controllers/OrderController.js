const OrderService = require("../services/OrderService");

const createOrderProduct = async (req, res) => {
  try {
    // console.log(req.body);
    const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone} = req.body;
    console.log(shippingPrice)
    if(!paymentMethod || !itemsPrice  || !totalPrice || !fullName || !address || !phone){
        return res.status(200).json({
            status: "ERR",
            message: "Vui lòng nhập đủ thông tin"
        })
    }

    const response = await OrderService.createOrderProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({ message: e });
  }
};

module.exports = {
  createOrderProduct
};
