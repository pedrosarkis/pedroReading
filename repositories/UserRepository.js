const baseModel = require('../common/baseModel')

module.exports = class UserRepository extends baseModel {
    constructor(userModel) {
        super(userModel)
        this.userSchema = userModel
    }
}