const mongoose = require('mongoose');

function connectDabatase() {
const url = 'mongodb+srv://sarkis:ssffdd66@cluster0-cbwpb.mongodb.net/test?retryWrites=true&w=majority';

const options = {reconnectTries : Number.MAX_VALUE,reconnectInterval : 500,useNewUrlParser : true};

mongoose.connect(url,options);

mongoose.set('useCreateIndex',true);

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