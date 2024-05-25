const { MongoMemoryServer } = require('mongodb-memory-server')

const mongod = new MongoMemoryServer()

const mongoose = require('mongoose')

module.exports = {
    connectDatabase: async () => {
        await mongod.start()
        const mongoUri = mongod.getUri()
        
        mongoose.connect(mongoUri)
    },
    closeDatabase: async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongod.stop()
    },
    clearDataBase: async () => {
        const collections = mongoose.connection.collections

        for (const key in collections) {
            await collections[key].deleteMany({}, {timeout: 200000})
        }
    },
    cleanCache: () => {
        MongoMemoryServer.cleanup()
    }
}