const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        res.status(403).send({msg:"la peticion no tiene cabecera"})
    }

    const token = req.headers.authorization.replace("Bearer ", "")

    try {
        const payload = jwt.decode(token)
        req.user = payload
        const {exp} = payload
        const currenData = new Date().getTime()

        if (exp <= currenData) {
            res.status(400).send({msg:"el token ha expirado"})
        }

    } catch (error) {
        return res.status(400).send({msg:"el token no es valido"})
    }
    next()
}

module.exports ={
    asureAuth,
}