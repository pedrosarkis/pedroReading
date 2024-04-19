'use strict'


module.exports = {
    create(model) {
        model.statics.getAll = async function () {
            return await this.find({})
        }
        model.statics.save = async function(payload) {
            return await this.create(payload)
        }
        model.statics.update = async function(id, payload) {
            return await this.updateOne({'_id': id}, payload)
        }
        model.statics.remove = async function(id) {
            return await this.remove({'_id': id})
        }

    return model;
    }
}