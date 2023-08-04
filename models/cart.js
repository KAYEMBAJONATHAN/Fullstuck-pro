const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
   name: {
    type: String,
    required: true,
   },
   icon: {
    type: String,
   },
   icon: {
    type: String,
   },
   color: {
    type: String,
   },
})

exports.Cart = mongoose.model('Cart', cartSchema);
