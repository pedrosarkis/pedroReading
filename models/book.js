const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {create} = require('./baseModel')

const BookSchema = create(new Schema({
    title: {type: String,required: true},
    pages : {type : Number, required: true} ,
    synopsis : {type: String, required: true},
    review : {type : String, required: true},
    image : {type: String,required: true},
    oauth : {type : String},
    user: {type: String, required: true},
    createdAt : {type: Date,default: Date.now },
}))

BookSchema.pre('save',async function (next) {
    let book = this
    book.user = await book.user.toLowerCase()
    return next()
})

module.exports = mongoose.model('Book',BookSchema)