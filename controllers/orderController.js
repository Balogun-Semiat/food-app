const Orders = require('../models/orderModel')

const makeOrder = async(req, res) =>{
    try{
        const order = await Orders(req.body);
        const newOrder = await Orders.save();
        return res.status(200).send(newOrder);
    } catch(error){
        console.error("Error making order", error);
        return res.status(500).send({message: "Error making order"})
    }
}

const updateOrderStatus = async(req, res) => {
    try {
        const {id }= req.params;
        const updateStatus = await Orders.findByIdAndUpdate(id, {status}, {new: true})
    } catch (error) {
        console.error("Error making order", error);
        return res.status(500).send({message: "Error updating status"})
    }
}

const getOrderByEmail = async(req, res) =>{
    const {email} = req.params
    const order = await Orders.find({email}).sort({createdAt: -1});

    if(!order){
        return res.status(400).send({message: "No order found"})
    }

    console.log(order)
    return res.status(200).json(order)
}


module.exports = {
    makeOrder,
    getOrderByEmail,
    updateOrderStatus
}