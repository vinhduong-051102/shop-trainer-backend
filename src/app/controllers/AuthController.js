const Auth = require("../models/Auth");

class AuthController {
  async index(req, res) {
    const data = await Auth.find();
    res.json(data);
  }
  me(req, res) {
    const id = req.params.id;
    Auth.findById(id, function (err, data) {
      if (!err) {
        res.json(data);
      }
    });
  }
  async list(req, res) {
    const data = await Auth.find();
    res.json(data).status(200);
  }

  async login(req, res) {
    const { email, password } = req.body;
    const data = await Auth.findOne({ email, password });
    if (data !== null) {
      res.json(data);
    } else {
      res.json({ message: "Email hoặc mật khẩu không đúng" });
    }
  }
  async register(req, res) {
    const { email, userName } = req.body;
    const allUserInfo = await Auth.find();
    const isExistEmail = allUserInfo.some((user) => user.email === email);
    const isExistUserName = allUserInfo.some((user) => user.userName === userName);

    if (isExistEmail) {
      res.json({ message: "Email đã tồn tại", status: false });
    }
    else if(isExistUserName) {
      res.json({ message: "Tên người dùng đã tồn tại", status: false });
    }
    else {
      const data = new Auth(req.body);
      try {
        await data.save();
        res.status(200).json(data);
      } catch (error) {
        res.send(error).status(400);
      }
    }
  }
  async update(req, res) {
    const id = req.params.id;
    const data = req.body;
    const prevData = await Auth.findById(id);
    const newData = { ...prevData._doc, ...data };
    await Auth.updateOne({ _id: id }, newData);
    res.json(newData).status(200);
  }
  async delete(req, res) {
    const id = req.params.id;
    const delData = await Auth.findById(id);
    await Auth.deleteOne({ _id: id });
    res.json(delData).status(200);
  }
}

module.exports = new AuthController();
