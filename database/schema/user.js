const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        required: true,
        min: 1,
        max: 2,
        default: 1
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', userSchema)