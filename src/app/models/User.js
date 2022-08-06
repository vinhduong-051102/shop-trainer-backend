const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    loginId: { type: String, required: true },
    userName: { type: String, required: true },
    fullName: { type: String, default: "" },
    email: { type: String, required: true },
    gender: { type: Number, default: null },
    birdDate: { type: String, default: null },
    address: { type: Array, default: [] },
    phoneNumber: { type: String, default: null, maxLength: 11 },
    order: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", User);
