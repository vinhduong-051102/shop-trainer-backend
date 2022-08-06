const Comment = require("../models/Comment");

class CommentController {
  async create(req, res) {
    const productId = req.body.productId;
    const data = new Comment({ productId });
    await data.save();
    res.json(data).status(200);
  }
  async post(req, res) {
    const id = req.params.id;
    const data = req.body;
    const prevData = await Comment.findOne({ productId: id });
    if (prevData) {
      const newData = { ...prevData._doc, comments: [...prevData.comments, data] };
      await Comment.updateOne({ productId: id }, newData);
      res.json(newData).status(200);
    } else {
      const data = new Comment({ productId: id });
      await data.save();
      res.json(data).status(200);
    }
  }
  async getComment(req, res) {
    const id = req.params.id;
    const data = await Comment.findOne({ productId: id });
    res.json(data).status(200);
  }
}

module.exports = new CommentController();
