const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique:true},
    password: {type: String, required: true, unique: true},
    role: {type: String, enum: ["buyer", "admin"], required: true},
    // order: [{type: mongoose.Schema.Types.ObjectId, ref: "Orders", required: true}],
    isVerified: { type: Boolean, default: false}
})

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;