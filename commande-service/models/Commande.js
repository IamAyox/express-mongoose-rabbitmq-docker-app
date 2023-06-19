const mongoose = require("mongoose");

const CommandeSchema = mongoose.Schema({
    products:{
        type: [String]
    },
    user_email : String,
    total_price:Number,
    created_at: {
        type: Date,
        default: Date.now(),
    },
});
module.exports = Commande = mongoose.model("commande", CommandeSchema);
