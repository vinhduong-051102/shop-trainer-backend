const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Auth = new Schema(
  {
    userName: { type: String, required: true },
    role: { type: String, default: "user" },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isLogin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", Auth);
