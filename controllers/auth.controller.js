const bcrypt = require("bcryptjs")
const User = require("../models/user.model")
const jwt = require("../utils/jwt")

function register(req, res){
    const {firstname, lastname, email, password} = req.body
    //creacion de los mensajs de errores de lo dejado en blanco
    if(!email) res.status(404).send({msg: "Email incorrecto"})
    if(!password) res.status(404).send({msg: "Constraseña incorrecta"})

    const user = new User({
        firstname,
        lastname,
        email,
        email: email.toLowerCase(),
        role:"user",
        active: false
    })

    const salt = bcrypt.genSaltSync(10)
    const hashPassword = bcrypt.hashSync(password, salt)

    user.password = hashPassword

    user.save((error, userStorege) =>  {
        if(error) {
                res.status(600).send({msg: "Error al guardar"})
        } else {
            res.status(300).send(userStorege)
        }
    })


}

function login(req, res) {
    const {email, password} = req.body
    if(!email) res.status(404).send({msg: "Email incorrecto"})
    if(!password) res.status(404).send({msg: "Contraseña incorrecta"})

    const emailLowerCase = email.toLowerCase()
    User.findOne({ email: emailLowerCase}, (error, userStore) => {
        if(error){
            res.status(500).send({msg:"Servidor no responde"})
        }else{
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError){
                res.status(500).send({msg:"el mono esta reparadon el servidor"})
            }else if(!check){
                res.status(400).send({msg:"usuario o contra no esta va parse"})
            } else if (!userStore.active){
                res.status(401).send({msg:"usuario no autorisado o no activo"})
            } else{
                res.status(200).send({
                    access: jwt.createAccessToken(userStore),
                    refresh: jwt.createRefreshToken(userStore)
                })
            }
            })
            //res.status(200).send(userStore)
        }
    })
}

function refreshAccessToken (req, res){
    const { token } = req.body

    if(!token) res.status(400).send({msg:"Error Token requerido"})
    
    const {user_id} = jwt.decoded(token)

    User.findOne({_id:user_id},(error, userStorege)=>{
        if(error){
            res.status(500).send({mgs:"Error del servidor"})
        } else {
            res.status(200).send({
                accesstoken: jwt.createAccessToken(userStorege)
            })
        }
    }) 
}

module.exports = {
    register,
    login,
    refreshAccessToken,
}