const express= require('express');
const router = express.Router();
const {category} = require('../models/category.js');


router.get(`/`,async (req,res)=>{
    const categoryList = await Product.find();
    if(!categoryList){
        res.status(500).json({success: false});
    }
    res.send(categoryList);
})


module.exports=router;