const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const { OrderItem } = require('../models/orderItem')

router.get('/', async (req, res) => {
    const oderList = await Order.find();

    if(!oderList) {
      res.status(500).json({success: false})
    }
    res.send(oderList);
});

router.get('/:id', async (req, res) => {
  const oder = await Order.findById(req.params.id)
  .populate('user', 'name')
  .populate({path: 'orderItems', populate: 'product'})

  if(!oder) {
    res.status(500).json({success: false})
  }
  res.send(oder);
});

router.post('/', async (req, res) => {
  try {
    const orderItems = req.body.orderItems.map(async (orderItem) => {
      let newOrderItem = new OrderItem({
        quatity: orderItem.quantity,
        product: orderItem.product,
      });

      newOrderItem = await newOrderItem.save();
      return newOrderItem._id;
    });

    const orderItemsIds = await orderItems;

    const totalPrices = await Promise.all(orderItemsIds.map(async (orderItemsId) => {
        const orderItem = await OrderItem.findById(orderItemsId).populate('product', 'price');
        const totalPrice = orderItem.product.price * orderItem.quatity;
        return totalPrice;
    }))

    const totalPrice = totalPrices.reduce((a,b) => a +b ,);

    console.log(totalPrices)

    let order = new Order({
      orderItems: orderItemsIds,
      shippingAddress1: req.body.shippingAddress1,
      shippingAddress2: req.body.shippingAddress2,
      city: req.body.city,
      zip: req.body.zip,
      country: req.body.country,
      phone: req.body.phone,
      status: req.body.status,
      totalPrice: totalPrice,
      user: req.body.user.user,
    });

    order = await order.save();

    if (!order) {
      return res.status(400).send('Order cannot be created');
    }

    res.send(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).send('An error occurred while creating the order');
  }
});

router.put(`/:id`, async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
      {
        status: req.body.status 
      },
      {new: true}
    )

    if(!order) {
      return res.status(400).send('cannot be created')
    }
    res.send(order);
});

router.delete(`/:id`, (req, res) => {
  Order.findByIdAndRemove(req.params.id).then(order =>{
    if(order) {
     return res.status(200).json({success: true, messsge: 'the order removed '})
    } else {
     return res.status(404).json({success: false , messsge: "The order not find"})
    }
  }).catch(err=>{
   return res.status(400).json({success: false, error: err})
  })
})

router.get('/get/totalsales', async (req, res) =>{
  const totalsales = await Order.aggregate([
    {$group: { _id: null , totalsales : { $sum: 'totalPrice'}}}
  ])

  if(!totalsales) {
    return res.status(400).send('The order sles cannot be created');
  }
  res.send({totalsales: totalsales.pop().totalsales})
})

router.get('/get/count', async (req, res) => {
  try {
    const orderCount = await Order.countDocuments();

    if (!orderCount) {
      return res.status(500).json({ success: false });
    }

    res.send({
      orderCount: orderCount,
    });
  } catch (error) {
    console.error('Error getting order count:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


module.exports = router;
