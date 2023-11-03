const express = require("express")
const bodyParser = require("body-parser")
const Cors = require("cors")
const {API_VERSION} = require("./constants")

const app = express()

//importar rutas
const authRouter = require("./router/auth.router")
const UserRouter = require("./router/user.router")
const menuRouter = require("./router/menu.router")
const CourseRouter = require("./router/course.router")
const postRouter = require("./router/post.router")
const newsletterRouter = require("./router/newsletter.router")


//configurar body parse
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//configuracion carpeta static

app.use(express.static("uploads"))

// configura header - Http - CORS

app.use(Cors())

// configura rutas
app.use(`/api/${API_VERSION}`,authRouter)
app.use(`/api/${API_VERSION}`,UserRouter)
app.use(`/api/${API_VERSION}`,menuRouter)
app.use(`/api/${API_VERSION}`,CourseRouter)
app.use(`/api/${API_VERSION}`,postRouter)
app.use(`/api/${API_VERSION}`,newsletterRouter)


module.exports = app