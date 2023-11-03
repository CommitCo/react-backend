const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        res.status(403).send({msg: "la peticion no tiene cabecera. !!ojo!!"})
    }

    const token = req.headers.authorization.replace("Bearer ", "")

    try {
        const payload = jwt.decode(token)
        //mostrava en payload
        const { exp } = payload
        const currentData = new Date().getTime()
        //aqui estubo un consolo.log

        if(exp <= currentData) {
            return res.status(400).send({msg:"el token ha expirado parsero no sirve"})
        }
        req.user = payload
        next()

    } catch (error) {
        return res.status(400).send({msg: "Token invalido"})
    }
    
}

module.exports = {
    asureAuth,
}
