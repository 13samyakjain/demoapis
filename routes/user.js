const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const key = require('../config/keys')

router.post('/register', async (req, res, next) => {
    try {
        const { username, password, contact } = req.body;
        let users = await UserModel.find({ username: username });
        if (users.length != 0) {
            return res.status(403).json({ 'message': 'Username already taken' })
        }
        const hash = bcrypt.hashSync(password.toString(), 10)
        const NewUser = new UserModel({
            username: username,
            password: hash,
            contact: contact
        })
        await NewUser.save();
        res.status(200).json({'message':'User Created'})
    } catch (error) {
        res.status(400).json({'message':error})
    }
})
router.post('/login',async (req,res,next)=>{
    const {username,password} = req.body;
    UserModel.findOne({username:username})
        .then(user=>{
            if(!user){
                return res.status(401).json({'message':'User Not Found'});
            }
            bcrypt.compare(password,user.password)
                .then(isMatch=>{
                    if(isMatch){
                        const payload = {
                            username:user.username,
                            contact:user.contact,
                            id:user._id
                        }
                        jwt.sign(payload,key.Secret_Key,{expiresIn:3600},(err,token)=>{
                            if(err)
                                return res.status(501).json({'message':'Internal Server Error'})
                            return res.status(200).json({'message':`Bearer ${token}`})
                        })
                    }
                    else{
                        return res.status(401).json({'message':'Password Didn\'t match'})
                    }
                })
        }) 
})

module.exports = router;