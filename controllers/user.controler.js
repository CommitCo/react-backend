const User = require('../models/user.model')
async function getMe(req, res) {
    const {user_id}=req.user
    const response = await User.findById(user_id)
    if (!response){
        res.status(400).send({msg:"Usuario no encontrado"})
    }else{
        res.status(200).send(response)
    }
}
module.exports = {
    getMe
}