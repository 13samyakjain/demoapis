const express = require('express');
const router = express.Router();
const UserModel = require('../models/user');
const bcrypt = require('bcryptjs')
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
module.exports = router;