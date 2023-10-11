const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const enums = {
  Author: "author",
  User: "user",
};

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    require: true,
    default: enums.User,
  },
});

userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema);
