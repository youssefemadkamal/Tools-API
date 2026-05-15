const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
    name:{type:String,required:true,minLength:3},
    price:{type:Number,required:true,min:1},
},{
    versionKey:false,
    timestamps:true
})

const toolModel = mongoose.model("Tool",toolSchema);

module.exports = toolModel;