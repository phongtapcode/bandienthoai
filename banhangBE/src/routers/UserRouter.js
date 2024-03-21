const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const {authMiddleware,authUserMiddleware} = require("../middleware/authMiddleware");

router.post('/sign-in',UserController.loginUser);
router.post('/sign-up',UserController.createUser);
router.put('/update-user/:id',UserController.updateUser);
router.delete('/delete-user/:id',authMiddleware,UserController.deleteUser);
router.get('/getAll',authMiddleware,UserController.getAllUser);
router.get('/get-details/:id',authUserMiddleware,UserController.getDetailsUser);

module.exports = router;