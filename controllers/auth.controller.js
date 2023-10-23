const bcrypt = require("bcrypt")
const User   = require("../models/user.model")
const jwt    = require("../utils/jwt")

function register(req, res){

    const{ firstname ,lastname ,email , password}= req.body

    if(!email)res.status(400).send({msg:"email obligatorio hijo"})

    if(!password)res.status(400).send({msg:"contraseña obligatoria perr@"})

    const user = new User({
        firstname,
        lastname,
        email:email.toLowerCase(),
        role:"user",
        active:false
    })
    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password, salt)

    user.password = hashpassword
    user.save((error, userStorage) =>{
        if(error){
            res.status(400).send({msg:"error al crear el usuario"})
        }else {
            res.status(200).send(userStorage)
        }
    })
}

function login(req, res) {
    const { email, password} = req.body

    if(!email)res.status(400).send({msg:"email Obligatorio carechimba"})
    if(!password)res.status(400).send({msg:"contraseña obligatoria"})

    const emailLowerCase = email.toLowerCase()
   
    User.findOne({email: emailLowerCase},(error, userStore)=>{
        if(error){
            res.status(500).send({msg:"Error del server"})
        }else{
            bcrypt.compare(password, userStore.password,(bcryptError,
            check) =>{
                if(bcryptError){
                    res.status(500).send({msg:"Error del server"})
                }else if(!check){
                    res.status(400).send({msg:"Usuario o contraseña incorrecta"})
                }else if(!userStore.active){
                    res.status(401).send({msg:"Usuario no autorizado o no activo"})
                }else{
                    res.status(200).send({
                        access: jwt.createaccesstoken(userStore),
                        refrest:jwt.createrefreshtoken(userStore)
                    })
                }
            })

        }
    })
}

function refreshAccessToken (req, res) {
    const {token} = req.body

    if(!token)res.status(400).send({msg:"error token requerido"})

    const {user_id} = jwt.decode(token)
    User.findOne({_id : user_id},(error, userStorage)=>{
        if(error){
            res.status(500).send({msg:"Error del server"})
        }else{
            res.status(200).send({
                accessToken: jwt.createaccesstoken(userStorage),
            })
        }
    })
}

module.exports = {
    register,
    login,
    refreshAccessToken
}