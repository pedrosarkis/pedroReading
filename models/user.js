const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');


const UserSchema = new Schema({   
    username : {type: String, required: true,unique : true},
    oauth : {type : String, required: true},
    email : {type : String, required: true},
    createdAt : {type: Date,default: Date.now },
})

UserSchema.pre('save',async function (next) {
    let user = this;
    if(!user.isModified('oauth')) return next();
    user.oauth = await bcrypt.hash(user.oauth,10);
    user.username = await user.username.toLowerCase();
    return next();
})

module.exports = mongoose.model('User',UserSchema);