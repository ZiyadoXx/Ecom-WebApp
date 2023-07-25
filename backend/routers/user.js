const express= require('express');
const router = express.Router();
const {user} = require('../models/user.js');


router.get(`/`,async (req,res)=>{
    const userList = await Product.find();
    if(!userList){
        res.status(500).json({success: false});
    }
    res.send(userList);
})


module.exports=router;