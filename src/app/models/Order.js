const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Order = new Schema(
  {
    products: { type: Array, default: [] },
    userId: { type: String, require: true },
    address: { type: Object, default: {} },
    paymentMethod: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", Order);
