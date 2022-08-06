const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/UserController')

router.get("/me/:id", userController.me)
router.get("/user/:id", userController.getUserById)
router.get("/user/:id", userController.getUserById)
router.put("/order/:id", userController.order)
router.put("/cancel_order/:id", userController.cancelOrder)
router.put("/cancel_all_order/:id", userController.cancelAllOrder)
router.post("/create", userController.create)
router.put("/update/:id", userController.update)
router.delete("/delete/:id", userController.delete)
router.get("/", userController.index)


module.exports = router