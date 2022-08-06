const authRouter = require('./auth')
const userRouter = require('./user')
const productRouter = require('./product')
const commentRouter = require("./comment")
const orderRouter = require('./order')

const siteRouter = require('./site')

const route = (app) => {
  app.use("/auth", authRouter)
  app.use("/user", userRouter)
  app.use("/product", productRouter)
  app.use("/comment", commentRouter)
  app.use("/order", orderRouter)
  app.use("/", siteRouter)
}

module.exports = route
