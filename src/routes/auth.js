const express = require('express')
const router = express.Router()

const authController = require('../app/controllers/AuthController')

router.post("/login", authController.login)
router.get("/list", authController.list)
router.get("/me/:id", authController.me)
router.post("/register", authController.register)
router.put("/update/:id", authController.update)
router.delete("/delete/:id", authController.delete)
router.get("/", authController.index)



module.exports = router