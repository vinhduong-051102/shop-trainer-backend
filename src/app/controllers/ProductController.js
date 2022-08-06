const Product = require("../models/Product");
const Comment = require("../models/Comment");

class ProductController {
  async get(req, res) {
    const id = req.params.id;
    const data = await Product.findById(id);
    res.json(data).status(200);
  }

  async list(req, res) {
    const data = await Product.find();
    res.json(data).status(200);
  }

  async children(req, res) {
    const data = await Product.find({category: 'kid'});
    res.json(data).status(200);
  }

  async adult(req, res) {
    const data = await Product.find({type: "shoes"})
    const arr = data.filter(item => {
      return item.category !== "kid"
    })
    res.json(arr).status(200)
  }

  async other(req, res) {
    const data = await Product.find({type: 'other'});
    res.json(data).status(200);
  }

  async create(req, res) {
    const data = new Product(req.body);
    await data.save();
    res.json(data).status(200);
  }

  async delete(req, res) {
    const id = req.params.id;
    const data = await Product.findById(id);
    await Product.deleteOne({ _id: id });
    res.json(data).status(200);
  }

  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const prevData = await Product.findById(id);
    const newData = { ...prevData._doc, ...data };
    await Product.updateOne({ _id: id }, newData);
    res.json(newData).status(200);
  }

  async bestSell(req, res) {
    const data = await Product.find({ type: "shoes" });
    data.sort((a, b) => b.amount - a.amount);
    const top8 = [];
    for (let i = 0; i < 8; i++) {
      top8.push(data[i]);
    }
    res.json(top8).status(200);
  }

  async new(req, res) {
    const data = await Product.find({ type: "shoes" });
    data.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    const top8 = [];
    for (let i = 0; i < 8; i++) {
      top8.push(data[i]);
    }
    res.json(top8).status(200);
  }

  async popular(req, res) {
    const data = await Comment.find();
    data.sort((a, b) => {
      return b.comments.length - a.comments.length;
    });
    const arr = []; 
    for (let i = 0; i < 8; i++) {
      arr.push(data[i].productId);
    }
    const top8 = []
    for (let i = 0; i < 8; i++) {
      const id = arr[i]
      const data = await Product.findById(id)
      top8.push(data)
    }
    res.json(top8).status(200);
  }

  async discount(req, res) {
    const data = await Product.find({ type: "shoes" });
    const discount = data.filter((item) => {
      return item.discount !== 0;
    });
    res.json(discount).status(200);
  }


}

module.exports = new ProductController();
