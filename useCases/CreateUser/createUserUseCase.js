const User = require('../../entities/User')

module.exports = class UserUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute(user) {
        const newUser = new User(user)
        return await this.userRepository.save(newUser)
    }
}