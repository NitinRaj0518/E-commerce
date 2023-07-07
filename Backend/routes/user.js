const express = require('express');
const bcrypt = require('bcryptjs');
const {User} = require('../models/User');
const jwt =  require('jsonwebtoken');
const router = express.Router();
const fs = require('fs');

router.post('/add',async(req,res)=>{
try{
    let {full_name,email,password} = req.body;
    /**generate password hash */
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = new User({full_name, email, password});
    await user.save();
    return res.status(200).json({
        message: 'User added successfully',
        user
    })
}catch (err) {
    return res.status(500).json({
        message: 'Something went wrong',
    })
}
})

router.post('/login',async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({ email: email});
        if(user){
            const verifyuser = await bcrypt.compare(password,user.password);
            if(verifyuser){
                const payload = {
                    user:{
                        id:user._id
                        //name:user.full_name,
                    }
                }
                const token =jwt.sign(payload,'siliconMERNCourse',{expiresIn:3600})
                
                res.status(200).json({
                    message: 'User logged in successfully',
                    user:{user_id:user._id, email:user.email},
                    token
                })
            }else{
                res.status(401).json({
                    message:"Wrong username/password"
                })
            }
        }
    }catch(err){
        res.status(401).json({
            message:"Something went wrong"
        })
    }
})

module.exports = router