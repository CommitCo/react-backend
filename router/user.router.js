const express = require("express")
const Usercontroller = require("../controllers/user.controler")
const md_auth =require("../middlewares/authenticated")

const api = express.Router()

api.get("/user/me", [md_auth.asureAuth], Usercontroller.getMe)


module.exports = api