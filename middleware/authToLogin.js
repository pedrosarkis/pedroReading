const User = require('../models/user')
const bcrypt = require('bcryptjs')

const auth = async (req, res, next) => {
    const { username, password } =  req.body
    const user = await User.findOne({username : username.toLowerCase()}).lean()
    if(!user) {
        res.status(401).json({message: 'Usuário não encontrado'})
        return false
    }
    
    const matchPassword = await bcrypt.compare(password, user.oauth)
    const matchEmail = user.username.toLowerCase() == username.toLowerCase()

    if(matchPassword && matchEmail) {
        req.session.username = req.body.username.toLowerCase()
        req.session.password = req.body.password.toLowerCase()
        return next()
    } 
    res.json({ 'message': 'Senha incorreta' })
}

module.exports = auth