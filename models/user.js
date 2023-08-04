const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    imagre: String,
    countInStock: {
        type: Number,
        required: true
    }
})

exports.User = mongoose.model('User', userSchema);
