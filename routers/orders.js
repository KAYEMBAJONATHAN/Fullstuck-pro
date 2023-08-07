const express = require('express');
const router = express.Router();
const Order = require('../models/order');

// Place an order
router.post('/', async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    const order = new Order({ userId, cartItems });
    await order.save();
    res.json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get orders for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ userId });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
