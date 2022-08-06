const express = require('express')
const router = express.Router()

const OrderController = require('../app/controllers/OrderController')

router.post("/create", OrderController.create)
router.put("/add_order/:id", OrderController.addOrder)
router.put("/cancel_order/:id", OrderController.cancelOrder)
router.get("/get_order/:id", OrderController.getOrder)
router.get("/get_all_order", OrderController.getAllOrder)
router.put("/change_status_order", OrderController.changeStatusOrder)


module.exports = router