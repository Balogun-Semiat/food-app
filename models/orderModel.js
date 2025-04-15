const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Foods' }],
    totalPrice: Number,
    address: {
        city: {type: String, required: true},
        state: {type: String, required: true},
        country: {type: String, required: true},
        zipcode: {type: String, required: true}
    },
    phoneNumber: Number,
    status: { type: String, enum: ['processing', 'delivered', 'cancelled'], default: 'processing' },
    createdAt: { type: Date, default: Date.now }
})

const orderModel = mongoose.model("Orders", orderSchema)

module.exports = orderModel;