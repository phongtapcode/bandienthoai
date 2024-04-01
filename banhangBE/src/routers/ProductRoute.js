const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");
// const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/create',ProductController.createProduct);
router.put('/update/:id',ProductController.updateProduct);
router.get('/get-details/:id',ProductController.getDetailsProduct);
router.delete('/delete/:id',ProductController.deleteProduct);
router.get('/getAll',ProductController.getAllProduct);

module.exports = router;

