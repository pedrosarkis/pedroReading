const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmailSchema = new Schema({
    from: {type: String,required: true},
    to : {type : String, required: true},
    subject : {type: String, required: true},
    text : {type : String, required: true},
    createdAt : {type: Date,default: Date.now },
})

module.exports = mongoose.model('Email',EmailSchema);