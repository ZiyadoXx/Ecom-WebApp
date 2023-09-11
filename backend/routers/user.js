const express= require('express');
const router = express.Router();
const AuthMiddleware = require('../helpers/jwt.js');
const api = require('../controllers/userController.js');



router.get('/register',(req,res)=>{
    res.render('register',{
        data:"dabi"
    })
})
router.post('/register',api.Register);

router.post('/login', api.Login);
router.delete('/delete', api.deleteUser);

router.get(`/`,AuthMiddleware,api.getAllUsers);

router.get('/:id',AuthMiddleware,api.getUserById);



module.exports=router;