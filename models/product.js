const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    richDescriptrion: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true,
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String,
    }],
    brand: {
        type: String,
        default: '',
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 230
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
})

productSchema.virtual('id').get(function () {
    return this._id.toHexString();
  })
  
productSchema.set('toJSON', {
    virtuals: true,
  })

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
