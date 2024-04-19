const baseModel = require('../common/baseModel')
const UserModel = require('../models/user')

module.exports = class UserRepository extends baseModel {
    constructor(userModel = UserModel) {
        super(userModel)
        this.userSchema = userModel
    }
}