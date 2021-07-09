const mongoose = require('mongoose');
const ChildSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        requried: true
    },
    dob: {
        type: Date,
        required: true
    },
    fathername: {
        type: String,
        requried: true
    },
    mothername: {
        type: String,
        required: true
    },
    state: {
        type: String,
        requried: true
    },
    district: {
        type: String,
        requried: true
    },
    imagePath: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Childmodel = mongoose.model('child',ChildSchema);
module.exports = Childmodel