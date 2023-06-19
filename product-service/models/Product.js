const mongoose = require("mongoose")

let ProductSchema = mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    quantity:Number,
    created_at:{
        type:Date,
        default: Date.now()
    }
})

module.exports = Product = mongoose.model("product",ProductSchema);