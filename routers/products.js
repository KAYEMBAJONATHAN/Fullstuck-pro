const { Product } = require('../models/product');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
      const productList = await Product.find();
  
      if (!productList || productList.length === 0) {
        return res.status(404).json({ success: false, message: 'No products found' });
      }
  
      res.status(200).json(productList);
    } catch (err) {
      res.status(500).json({ error: err, success: false });
    }
  });
  
  router.post('/', async (req, res) => {
     const cart = await Cart.findById(req.body.Cart)
     if(!cart) return res.status(400).send('Invalid Cart')
    const product = new Product({
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
    
     if(!product)
        return res.status(500).send('The product is not created')
       
        res.send(product);
  });
  
  module.exports = router;
  