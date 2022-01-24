const express=require("express")
const router = express.Router()
const blog = require("../controller/controller.js")
const veryfyToken = require("../auth.js")
router.post("/signup",blog.signup)

router.get("/get_signup",blog.get_signup)

router.post("/login",blog.login)

router.post("/post_data",veryfyToken,blog.post_data)

router.get("/get_posts/:post_id",blog.get_posts)

router.post("/likedislike",veryfyToken,blog.likedislike)

router.get("/likedislike",blog.get_likedislike)

module.exports =router
