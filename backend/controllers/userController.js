const {User} = require('../models/user.js');
const bcrypt = require('bcryptjs'); 


const getAllUsers = async (req,res)=>{
        try {
            const userList = await User.find().select('-passwordHash');
            if(!userList){
                res.status(500).json({success: false});
            }
            return res.status(200).json({userList, success: true});    
        } catch (err) {
            return res.status(500).json({err:err.message,success:false})
        }
    }

const getUserById = async(req,res)=>{
    const user= await User.findById(req.params.id).select('-passwordHash');
    if(!user){
        res.status(500).json({message: 'The user was not found.'});
    }
    res.status(200).send(user);

}


const Register = async (req,res)=>{
    /* let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password,10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city, 
        country: req.body.country,
    })
    user = await user.save();
    if(!user)
    return res.status(404).send('the user can not be created !');

    res.send(user); */
    const formData = req.body; // Access form data from req.body
  // Process the form data here (e.g., save to a database)
    console.log(formData);
}

const Login = async(req,res)=>{
    const user = await User.findOne({email: req.body.email})
    const secret = process.env.JWT_SECRET;
    if(!user) {
        return res.status(400).send("there is no user registred with this email");
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
        const token = jwt.sign({
            userId: user.id
        },secret,{expiresIn:'1d'})
        res.status(200).send({user: user.email, token: token})
    }
    else{ 
        return res.status(400).send("incorrect password")
    }
   
}

const deleteUser = async(req,res)=>{
    User.findByIdAndRemove(req.params.id)
    .then(user=>{
        if(user){
            return res.status(200).json({success: true, message: 'the user is deleted !'})
        }else {
            return res.status(404),json({success: false, message: 'user not found !'})
        }
    }).catch(err=>{
        return res.status(400).json({success: false, error:err})
    })

}

module.exports = {
    getAllUsers,
    getUserById,
    Register,
    Login,
    deleteUser


}
