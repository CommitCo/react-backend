const jwt = require("jsonwebtoken")
const {JWT_SECRET_KEY} = require("../constants")

function createaccesstoken(user) {
    const expirationToken = new Date()
    expirationToken.setHours(expirationToken.getHours()+3)


    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp:expirationToken.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY)
}

function createrefreshtoken(user) {
    const expirationToken = new Date()
    expirationToken.getMonth(expirationToken.getMonth()+1)


    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp:expirationToken.getTime()
    }

    return jwt.sign(payload, JWT_SECRET_KEY)
}

function decode(token) {
    return jwt.decode(token,JWT_SECRET_KEY, true)
}
module.exports = {
    createaccesstoken,
    createrefreshtoken,
    decode
}