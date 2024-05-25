const User = require('../../entities/User')

module.exports = class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute(user) {
        try {
            const newUser = new User(user)
            return await this.userRepository.save(newUser)
        } catch (error) {
            return error
        }
        
    }
}