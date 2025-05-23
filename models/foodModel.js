const mongoose = require("mongoose");


const foodSchema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    image: {type: String, required: true},
    isAvailable: {type: Boolean, default: true}
})

const foodmodel = mongoose.model("Foods", foodSchema);

module.exports = foodmodel; 