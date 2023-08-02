const Cart = require('../models/cart');
const express = require('express');
const router = express.Router();

router.get(`/`, async (req,res) => {
    const productList = await Product.find();
    
    if(productList) {
        res.status(500).json({success: false})
    }
    res.send(productList);
  })
  
  router.post(`/`, (req,res) => {
    const produt = new Product({
        name: req.body.name,
        image: req.baseUrl.image,
        countInStock: req.body.countInStock
    })

    produt.save().then((createdProduct => {
        res.status(201).json(createdProduct)
    })).catch((err) => {
        res.status(500).json({
            error: err,
            success: false
        })
    })
  })

  module.exports = router;
  