const express = require('express');
const router = express.Router();
const Cart  = require('../models/cart');

router.get(`/`, async (req, res) => {
  const cartList = await Cart.find();

  if(!cartList) {
    res.status(500).json({success: false})
  }
  res.status(200).send(cartList);
});

router.get(`/:id`, async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if(!cart) {
    res.status(500).json({messsge: 'cart not found'})
  }
  res.status(200).send(cart);
});

router.post(`/`, async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if(!cart) {
    res.status(500).json({messsge: 'cart not found'})
  }
  res.status(200).send(cart);
});

router.post(`/:id`, async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if(!cart) {
    res.status(500).json({messsge: 'cart not found'})
  }
  res.status(200).send(cart);
});

router.put(`/:id`, async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
      {
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color,
      },
      {new: true}
    )

    if(!cart) {
      return res.status(400).send('cannot be created')
    }
    res.send(cart);
});

router.delete(`/:id`, (req, res) => {
   Cart.findByIdAndRemove(req.params.id).then(cart =>{
     if(cart) {
      return res.status(200).json({success: true, messsge: 'the card find'})
     } else {
      return res.status(404).json({success: false , messsge: "cart will be find"})
     }
   }).catch(err=>{
    return res.status(400).json({success: false, error: err})
   })
});

module.exports = router;
