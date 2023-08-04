const { Cart } = require('../models/cart');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const cartList = await Cart.find();

  if (!cartList) {
    return res.status(500).json({ success: false });
  }
  res.status(200).send(cartList);
});

router.get('/:id', async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) {
    return res.status(500).json({ message: 'the cart id was not found' });
  }
  res.status(200).send(cart);
});

router.post('/', async (req, res) => {
  let cart = new Cart({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });
  cart = await cart.save();

  if (!cart) {
    return res.status(400).send('the cart cannot be created');
  }
  res.send(cart);
});

router.put('/:id', async (req, res) => {
  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {new: true}
  );

  if (!cart) {
    return res.status(400).send('cart not found');
  }
  res.send(cart);
});

router.delete('/:id', (req, res) => {
    Cart.findByIdAndRemove(req.params.id).then(cart => {
      if(cart) {
        return res.status(200).json({success: true, message: 'the cart was deleted'})
      }else {
        return res.status(404).json({success: false, message: "cart"});
      }
    }).catch(err=>{
        return req.status(404).json({success: false, error: err});
    })    
  });

module.exports = router;
