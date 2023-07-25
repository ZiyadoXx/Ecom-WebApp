const express= require('express');
const router = express.Router();
const {Product} = require('../models/products.js');


router.get(`/`,async (req,res)=>{
    const productlist = await Product.find();
    if(!productlist){
        res.status(500).json({success: false});
    }
    res.send(productlist);
})

router.post(`/`,(req,res)=>{
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        CountInStock: req.body.CountInStock
    })
    product.save().then((createdProduct=>{
        res.status(201).json(createdProduct)
    })).catch((err)=>{
        res.status(500).json({
            error: err,
            success: false
        })
    })
})

module.exports=router;