module.exports = class BaseModel {
    constructor(model) {
        this.model = model
    }

    async save(data) {
        return await this.model.create(data)
    }

    async getAll() {
        return await this.model.find({})
    }
}