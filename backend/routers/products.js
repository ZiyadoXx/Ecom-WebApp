const express= require('express');
const router = express.Router();
const {Product} = require('../models/products.js');
const { Category} = require('../models/category.js');
const mongoose = require('mongoose');

router.get(`/`,async (req,res)=>{
    let filter= {};
    if(req.query.category){
        filter = {category: req.query.category.split(',')}
    }
    const productlist = await Product.find(filter).populate('category');
    if(!productlist){
        res.status(500).json({success: false});
    }
    res.send(productlist);
})


router.get(`/:id`,async (req,res)=>{
    const product = await Product.findById(req.params.id).populate('category');
    if(!product){
        res.status(500).json({success: false});
    }
    res.send(product);
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


router.put('/:id',async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('invalid Product ID')
    }
    const category = await Category.findById(req.body.category);
    if(!category) return res.status(400).send('Invalid Category !');

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
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
        },
        {new: true}
    )
    if(!product)
    return res.status(404).send('the category can not be created !');

    res.send(product);
})


router.delete('/:id',(req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({success: true, message: 'the product is deleted !'})
        }else {
            return res.status(404),json({success: false, message: 'product not found !'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error:err})
    })
})


router.get(`/get/count`, async (req, res) => {
    try {
        const productCount = await Product.countDocuments();
        res.send({
            productCount: productCount
        });
    } catch (error) {
        console.error('Error getting product count:', error);
        res.status(500).json({ success: false });
    }
})


router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    try {
        const products = await Product.find({isFeatured: true}).limit(+count);
        res.send({
            products: products
        });
    } catch (error) {
        console.error('Error getting featured products:', error);
        res.status(500).json({ success: false });
    }
})


module.exports=router;