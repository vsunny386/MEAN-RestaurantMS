const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/RMSdb").then(
    ()=>{
        console.log("Connection Successfull")
    }
).catch(
    (e)=>{
        console.log("Connection Failed")
    }
)