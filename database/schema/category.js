const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
},{
    timestamps: true
});

module.exports = mongoose.model('ComponentCategory', userSchema)