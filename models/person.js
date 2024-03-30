const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:Number,
    work:{
        type:String,
        enum:["chef","waiter","manager"]
    },
    salary:{
        type:Number
    },
    address:String
})

const personSchema = mongoose.model("Person",schema)

module.exports = personSchema