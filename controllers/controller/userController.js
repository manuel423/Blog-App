const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../../models/user");
const JWT_SECRET = require("../../config/env").JWT_SECRET

const hashPasword = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return done(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        resolve(hash);
      });
    });
  });
};

//Password Checker
const isPasswordCorrect = async (pass1, pass2) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(pass1, pass2, (err, result) => {
      resolve(result);
    });
  });
};

module.exports = {
  createUser: async (req, res) => {
    try {
      const data = req.body;
      const hashed_password = await hashPasword(data.password);

      const user = new User({
        fullName: data.fullName,
        email: data.email,
        password: hashed_password,
        role: data.role,
      });

      await user.save();
      return res.status(201).json({
        success: true,
        message: "User created successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: true,
        message: error.message,
      });
    }
  },

  login: async function (req, res) {
    const data = req.body;
    const email = data.email.toLowerCase();
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: `User Not Found!`,
      });
    } else {
      if (await isPasswordCorrect(data.password, user.password)) {
        var tmp_user_obj = {
          _id: user._id,
          username: user.first_name,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          __v: user.__v,
        };

        jwt.sign(
          {
            user: tmp_user_obj,
          },
          JWT_SECRET,
          (err, token) => {
            if (err) {
              return res.status(500).json({
                success: false,
                message: `Something Went Wrong!`,
              });
            }
            return res.status(200).json({
              success: true,
              message: `Sign In Successfull`,
              data: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({
          success: false,
          message: `Incorrect Credential!`,
        });
      }
    }
  },

  getUser: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: true,
        message: "User created successfully!",
      });
    }
  },
};
