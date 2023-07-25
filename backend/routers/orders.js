const express= require('express');
const router = express.Router();
const {orders} = require('../models/orders.js');


router.get(`/`,async (req,res)=>{
    const orderslist = await Product.find();
    if(!orderslist){
        res.status(500).json({success: false});
    }
    res.send(orderslist);
})


module.exports=router;