const mongoose = require('mongoose');
require('dotenv').config()

const connectDabatase = () => {
    const url = process.env.databaseURL;

    mongoose.connect(url);

    mongoose.connection.on('error', (err) => {
        console.log('Erro na conexão com o banco', err)
    })

    mongoose.connection.on('connected', (err) => {
        console.log('Sucesso na conexão com o banco')
    })

    mongoose.connection.on('disconnected', (err) => {
        console.log('Perda de conexão com o banco', err)
    })
}

exports.connectDabatase = connectDabatase; // usando module.exports não funciona para este caso