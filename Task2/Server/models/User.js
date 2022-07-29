const mongoose = require('mongoose')
let UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    image:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    }

})

module.exports = mongoose.model('users', UserSchema)