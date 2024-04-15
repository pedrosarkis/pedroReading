const mongoose = require('mongoose');

function connectDabatase() {
const url = 'mongodb+srv://sarkis:ssffdd66@sarkis.un83y.mongodb.net/?retryWrites=true&w=majority&appName=sarkis';



mongoose.connect(url);



mongoose.connection.on('error',(err) => {
    console.log('Erro na conexão com o banco')
})

mongoose.connection.on('connected',(err) => {
    console.log('Sucesso na conexão com o banco')
})

mongoose.connection.on('disconnected',(err) => {
    console.log('Perda de conexão com o banco')
})
}

exports.connectDabatase = connectDabatase; // usando module.exports não funciona para este caso