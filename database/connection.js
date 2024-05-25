const mongoose = require('mongoose');
require('dotenv').config()
const { MongoMemoryServer } = require('mongodb-memory-server')
const mongod = new MongoMemoryServer()

const connectDabatase = async () => {
    let url
    console.log('apareceu aqui')
    if(process.env.NODE_ENV === 'test') {
        await mongod.start()
        url = mongod.getUri()
    } else {
        url = process.env.databaseURL
    }

    mongoose.connect(url);

    mongoose.connection.on('error', (err) => {
        console.log('Erro na conexão com o banco', err)
    })

    if(mongoose.connection.readyState === 1) {
        console.log('ja conectado')
    }

    mongoose.connection.on('connected', () => {
        console.log('Sucesso na conexão com o banco')
    })

    mongoose.connection.on('disconnected', (err) => {
        console.log('Perda de conexão com o banco', err)
    })
}

exports.connectDabatase = connectDabatase; // usando module.exports não funciona para este caso