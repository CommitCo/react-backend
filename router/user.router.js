const express = require("express")
const multiparty = require("connect-multiparty")
const Usercontroller = require("../controllers/user.controler")
const md_auth = require("../middlewares/authenticated")

const md_upload = multiparty({uploadDir:"./uploads/avatar"})
const api = express.Router()

api.get("/user/me", [md_auth.asureAuth], Usercontroller.getMe)
api.get("/users", [md_auth.asureAuth], Usercontroller.getUsers)
api.post("/user", [md_auth.asureAuth,md_upload], Usercontroller.createUser)


module.exports = api