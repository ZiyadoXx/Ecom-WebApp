const {orders} = require('../models/orders.js');

const getAllOrders = async (req,res)=>{
    const orderslist = await Product.find();
    if(!orderslist){
        res.status(500).json({success: false});
    }
    res.send(orderslist);
}

module.exports = {
    getAllOrders

}