const mongoose = require('mongoose');

const componentSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ComponentCategory'
    },
    thumbnail: {
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