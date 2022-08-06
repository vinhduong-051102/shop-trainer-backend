const express = require('express')
const router = express.Router()

const productController = require('../app/controllers/ProductController')

router.get("/list", productController.list)

router.get("/best_sell", productController.bestSell)
router.get("/get/:id", productController.get)
router.get("/new", productController.new)
router.get("/popular", productController.popular)
router.get("/discount", productController.discount)
router.get("/other", productController.other)
router.get("/children", productController.children)
router.get("/adult", productController.adult)
router.put("/update/:id", productController.update) 
router.post("/create", productController.create)
router.delete("/delete/:id", productController.delete)




module.exports = router