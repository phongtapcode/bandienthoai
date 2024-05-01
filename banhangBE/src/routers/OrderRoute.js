const express = require("express");
const router = express.Router();
const OrderProduct = require("../controllers/OrderController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/create',OrderProduct.createOrderProduct);

module.exports = router;

