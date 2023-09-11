const express= require('express');
const router = express.Router();
const api = require('../controllers/productsController')

router.get(`/`,api.getAllProducts);


router.get(`/:id`,api.getProductById);


router.post(`/`,api.createProduct);


router.put('/:id',api.updateProduct);


router.delete('/:id',api.deleteProduct);


router.get(`/get/count`,api.productCount);


router.get(`/get/featured/:count`,api.featuredProducts);


module.exports=router;