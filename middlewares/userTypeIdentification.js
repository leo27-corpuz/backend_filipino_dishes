const { User } = require('../models');
const isUser =  async (req, res, next) => {
    //check if user is user
    const {id} = req.user
    const user = await User.findOne({
        attributes: ['id', 'type'],
        where: {id: id}}
        )
        console.log(user.type)
    if(user.type != 2) return res.sendStatus(401)
    next()
}
const isAdmin = async (req, res, next) => {
    const {id} = req.user
    const user = await User.findOne({
        attributes: ['id', 'type'],
        where: {id: id}}
        )
    if(user.type != 1) return res.sendStatus(401)
    next()
}
module.exports = { isUser, isAdmin }