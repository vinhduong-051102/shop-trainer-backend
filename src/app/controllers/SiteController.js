class AuthController {
  index(req, res) {
    res.send("home");
  }
  search(req, res) {
    res.send("search")
  }
}

module.exports = new AuthController;