const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const JwtService = require("./JwtService")

const createUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    const { name, email, password, confirmPassword, phone } = newUser;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser !== null) {
        resolve({
          status: "ERR",
          message: "Email đã tồn tại",
        });
      }
      // Tạo mã hóa password
      const hashPassword = bcrypt.hashSync(password, 10);

      const createdUser = await User.create({
        name,
        email,
        password: hashPassword,
        phone,
      });
      if (createdUser) {
        resolve({
          status: "Success",
          message: "Success",
          data: createUser,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

const loginUser = (userLogin) => {
  return new Promise(async (resolve, reject) => {
    const {email, password} = userLogin;
    try {
      const checkUser = await User.findOne({
        email: email,
      });

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      const comparePassword = bcrypt.compareSync(password, checkUser.password);

      if (!comparePassword) {
        resolve({
          status: "ERR",
          message: "The password or user is incorrect"
        });
      }

      const access_token = await JwtService.genneralAccessToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin
        })

        const refresh_token = await JwtService.genneralRefreshToken({
          id: checkUser.id,
          isAdmin: checkUser.isAdmin
        })

      resolve({
        status: "Success",
        message: "Success",
        access_token,
        refresh_token
      })
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (id,data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({_id:id});

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      const updatedUser = await User.findByIdAndUpdate(id,data,{new: true});

      return resolve({
        status: "Success",
        message: "Success",
        data: updatedUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

const deleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({_id:id});

      if (checkUser === null) {
        resolve({
          status: "ERR",
          message: "The user is not defined",
        });
      }

      const deletedUser = await User.findByIdAndDelete(id);

      return resolve({
        status: "Success",
        message: "Delete success"
      })
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allUser = await User.find();

      return resolve({
        status: "Success",
        message: "All User",
        data: allUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

const getDetailsUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const checkUser = await User.findOne({_id:id});

      return resolve({
        status: "Success",
        message: "DetailUser",
        data: checkUser
      })
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
  getAllUser,
  getDetailsUser
};
