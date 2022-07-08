const mongoose = require("mongoose");
const validator = require("validator");
const brcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const menuSchema = mongoose.Schema({
    name:{
        type:String,
        minlength: 2,
        required:true
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type: Number,
        required:true
    },
    image:{
        type:String
    }
})

const MenuModel = mongoose.model("menu",menuSchema)

module.exports = MenuModel;