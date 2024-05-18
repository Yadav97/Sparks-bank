const mongoose = require("mongoose")

const customerschema = new mongoose.Schema({

    no:Number,
    name:String,
    email:String,
    currbal:Number
    
})

const customer = mongoose.model("customer",customerschema)

module.exports = customer;