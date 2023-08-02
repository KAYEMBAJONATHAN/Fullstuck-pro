const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: String,
    price: String,
    description: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);
