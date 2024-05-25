module.exports = class BaseModel {
    constructor(model) {
        this.model = model
    }

    async save(data) {
        try {
            return await this.model.create(data)
        } catch (error) {
            return error
        }
        
    }

    async getAll() {
        return await this.model.find({})
    }
}