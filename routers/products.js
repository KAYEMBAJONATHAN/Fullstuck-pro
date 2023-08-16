const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Cart = require('../models/cart');
const mongoose = require('mongoose');

// Get all products
router.get('/', async (req, res) => {
  const productList = await Product.find().populate('cart');

  if (!productList) {
    return res.status(500).json({ success: false });
  }
  res.send(productList);
});

router.get('/:id', async (req, res) => {
  const productList = await Product.find().populate('cart');

  if (!productList) {
    return res.status(500).json({ success: false });
  }
  res.send(productList);
});

// Create a new product
router.post('/', async (req, res) => {
  const cart = await Cart.findById(req.body.cart);
  if (!cart) return res.status(400).send('Invalid cart');

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    cart: req.body.cart,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
  });

  product = await product.save();
  if (!product) {
    return res.status(500).send('Product cannot be created');
  }
  res.send(product);
});

// Update a product
router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send('Invalid product ID');
  }

  const cart = await Cart.findById(req.body.cart);
  if (!cart) return res.status(400).send('Invalid cart');

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      cart: req.body.cart,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
    },
    { new: true } // To return the updated product
  );

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.send(product);
});

// Delete a product
router.delete('/:id', async (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then(product => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: 'The product was deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Product not found' });
      }
    })
    .catch(err => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get('/get/count', async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    res.send({
      productCount: productCount,
    });
  } catch (error) {
    console.error('Error counting products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/get/featured', async (req, res) => {
    const products = await Product.find({isFeatured: true});

    if(products) {
      res.status(500).json({success: false})
    }
     res.send(products);
});

router.get('/get/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const products = await Product.find({isFeatured: true}).limit(+count);

  if(products) {
    res.status(500).json({success: false})
  }
   res.send(products);
});

module.exports = router;
