const mongoose = require("mongoose")

let UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    points : {
        type:Number,
        default:0
    },
    created_at:{
        type:Date,
        default: Date.now()
    }
})

module.exports = User = mongoose.model("user",UserSchema);