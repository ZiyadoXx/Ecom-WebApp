const express= require('express');
const router = express.Router();
const {Product} = require('../models/products.js');
const { Category} = require('../models/category.js');


router.get(`/`,async (req,res)=>{
    const productlist = await Product.find();
    if(!productlist){
        res.status(500).json({success: false});
    }
    res.send(productlist);
})

router.post(`/`,async (req,res)=>{
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category !');
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        CountInStock: req.body.CountInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
    }).save();

    if(!product)
    return res.status(500).send('The product can not be created !')
    
    return res.send(product);
})

module.exports=router;