const Order = require("../models/Order");
const User = require("../models/User");

class OrderController {
  async create(req, res) {
    const data = new Order(req.body);
    await data.save();
    res.json(data).status(200);
  }

  async getOrder(req, res) {
    const userId = req.params.id;
    const data = await Order.findOne({ userId });
    const orders = data.products;
    res.json(orders).status(200);
  }

  async getAllOrder(req, res) {
    const data = await Order.find();
    const arr = data.map((item) => {
      return item.products.map((i, index) => {
        return { userId: item.userId, product: i, originalIndex: index };
      });
    });
    res.json(...arr).status(200);
  }

  async addOrder(req, res) {
    const data = req.body;
    const { paymentMethod, address, products } = data;
    const loginId = req.params.id;
    const user = await User.findOne({ loginId });
    const userId = user._id;
    const prevData = await Order.findOne({ userId });
    const newData = {
      ...prevData._doc,
      products: [...prevData._doc.products, ...products],
      paymentMethod,
      address,
    };
    await Order.updateOne({ userId }, newData);
    res.status(200).json(newData);
  }

  async changeStatusOrder(req, res) {
    const { userId, index, status } = req.body;
    const prevData = await Order.findOne({ userId });
    prevData._doc.products[index].status = status;
    await Order.updateOne({ userId }, prevData._doc);
    res.json(prevData._doc);
  }

  async cancelOrder(req, res) {
    const loginId = req.params.id;
    const user = await User.findOne({ loginId });
    const userId = user._id;
    const index = req.body.index;
    const prevData = await Order.findOne({ userId });
    const status = prevData._doc.products[index].status;
    if (status === 0) {
      const arr = prevData._doc.products.filter((item, i) => i !== index);
      const newData = { ...prevData._doc, products: [...arr] };
      await Order.updateOne({ userId }, newData);
      res.json(newData).status(200);
    } else {
      res.json({ message: "Chỉ có thể xoá đơn hàng khi chờ xác nhận" });
    }
  }
}

module.exports = new OrderController();
