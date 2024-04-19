const createUserController = require('./createUserController')
const UserUseCase = require('./createUserUseCase')
const UserRepository = require('../../repositories/UserRepository')
const userModel = require('../../models/user')

module.exports = new createUserController(
    new UserUseCase(
        new UserRepository(userModel)
    )
)