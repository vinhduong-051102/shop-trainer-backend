const User = require("../models/User");
const Auth = require("../models/Auth");

class UserController {
  index(req, res) {
    res.send("home");
  }
  async me(req, res) {
    const id = req.params.id;
    const data = await User.findOne({ loginId: id });
    res.json(data).status(200);
  }
  async getUserById(req, res) {
    const id = req.params.id;
    const data = await User.findById(id)
    res.json(data).status(200);
  }
  async create(req, res) {
    const { userName, email, loginId } = req.body;
    const data = new User({ userName, email, loginId });
    await data.save();
    res.json(data).status(200);
  }
  async delete(req, res) {
    const id = req.params.id;
    const data = await User.findById(id);
    await User.deleteOne({ _id: id });
    res.json(data).status(200);
  }
  async update(req, res) {
    const loginId = req.params.id; 
    const prevData = await User.findOne({ loginId });
    const data = req.body;
    const newData = { ...prevData._doc, ...data };
    await User.updateOne({ loginId }, newData);
    res.json(newData).status(200);
  }
  async order(req, res) {
    const loginId = req.params.id; 
    const prevData = await User.findOne({ loginId });
    const data = req.body;
    const newData = { ...prevData._doc, order: [...prevData._doc.order, data]  };
    await User.updateOne({ loginId }, newData);
    res.json(newData).status(200);
  }
  async cancelOrder(req, res) {
    const loginId = req.params.id; 
    const prevData = await User.findOne({ loginId });
    const index = req.body.index;
    const newData = prevData._doc.order.filter((data, i) => {
      return i !== index
    })
    await User.updateOne({ loginId }, {...prevData._doc, order: [...newData]});
    res.json(newData).status(200);
  }
  async cancelAllOrder(req, res) {
    const loginId = req.params.id; 
    const prevData = await User.findOne({ loginId });
    await User.updateOne({ loginId }, {...prevData._doc, order: []});
    res.json([]).status(200);
  }
}

module.exports = new UserController();
