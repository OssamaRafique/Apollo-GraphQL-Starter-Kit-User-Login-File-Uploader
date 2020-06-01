const mongoose = require('mongoose');

const componentSchema = mongoose.Schema({
    identifier: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Component', componentSchema)