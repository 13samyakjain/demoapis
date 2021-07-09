const mongoose = require('mongoose')
const LocationSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    districts: {
        type: Array,
        required: false
    }
}, { timestamps: true })

const LocationModel = mongoose.model('location', LocationSchema);
module.exports = LocationModel