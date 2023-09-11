const express= require('express');
const api = require('../controllers/categoryController');
const router = express.Router();



router.get(`/`,api.getAllCategories);

router.get('/:id',api.getCategoryById);

router.post('/',api.createCategory);

router.put('/:id',api.updateCategory);

router.delete('/:id',api.deleteCategory);

module.exports=router;