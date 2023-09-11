const express= require('express');
const router = express.Router();
const api = require('../controllers/ordersController');


router.get(`/`,api.getAllOrders);


module.exports=router;