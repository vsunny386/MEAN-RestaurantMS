const mongoose = require("mongoose");
const UserModel = require("./userModel");
const { Schema } = mongoose

const completedOrderSchema = mongoose.Schema({
    order: {
        type: mongoose.Types.ObjectId, ref: 'Order',
    }
}) 
04
const completedOrderModel = mongoose.model("Completed_Orders",completedOrderSchema)

module.exports = completedOrderModel;