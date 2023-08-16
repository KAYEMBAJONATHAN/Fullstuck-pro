const mongoose = require('mongoose');

const OderItemSchema = mongoose.Schema({
    quatity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }
})

exports.OrderItem = mongoose.model('OrderItem', OderItemSchema);