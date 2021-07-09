const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        requried: true
    }
}, { timestamps: true })
const UserModel = mongoose.model('user', UserSchema);
module.exports = UserModel