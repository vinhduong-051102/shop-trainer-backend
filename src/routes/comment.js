const express = require('express')
const router = express.Router()

const commentController = require('../app/controllers/CommentController')

router.get("/create", commentController.create)
router.get("/get_comment/:id", commentController.getComment)
router.put("/post/:id", commentController.post) 


module.exports = router