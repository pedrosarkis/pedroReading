'use strict'

module.exports = {
    expectTest: (current) => {
        delete current.id
        delete current._id
        delete current.__v
        delete current.createdAt
        delete current.oauth
        return current
    }
}