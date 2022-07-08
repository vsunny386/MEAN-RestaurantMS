const mongoose = require("mongoose");
const UserModel = require("./userModel");
const { Schema } = mongoose

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId, ref: 'user',
    },
    cart:[{
        type: Object,
        required: true,
    }],
    address:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    amount:{
        type:Number,
        required: true
    },
    tax:{
        type:Number,
        default: 5
    },
    contact: {
        type: Number,
        required: true
    },
    paymentMode:{
        type:String,
        required: true
    },
    status:{
        type:Boolean,
        default: false
    },
    
}) 

const orderModel = mongoose.model("Order",orderSchema)

module.exports = orderModel;