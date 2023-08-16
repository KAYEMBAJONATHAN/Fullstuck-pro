const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get(`/`, async (req, res) => {
  const userList = await User.find();

  if(!userList) {
    res.status(500).json({success: false})
  }
  res.send(userList);
});

router.get(`/:id`, async (req, res) => {
  const user = await User.findById();

  if(!user) {
    res.status(500).json({success: false})
  }
  res.send(user);
});

router.post('/', async (req, res) => {
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      passwordHash: req.body.passwordHash,  //bcrypt.hashSync(req.body.password, 'my secret'),
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country
    })
    user = await user.save();

    if(!user) {
      return res.status(400).send('User cannot be created')
    }
    res.send(user)
})

router.put('/:id', async (req, res) => {

  const userExist = await User.findById(req.params.id);
  let newPassword
  if(req.params.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10)
  } else {
     newPassword = userExist.passwordHash;
  }

  const user =  await User.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country
    },
    {new: true}
    )

    if(!user) {
      return res.status(400).send('User cannot be created')
    }
    res.send(user);
});

router.delete(`/:id`, (req, res) => {
  User.findByIdAndRemove(req.params.id).then(user =>{
    if(user) {
     return res.status(200).json({success: true, messsge: 'The user was remove'})
    } else {
     return res.status(404).json({success: false , messsge: "user will be removed"})
    }
  }).catch(err=>{
   return res.status(400).json({success: false, error: err})
  })
});

router.post('/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  
  if (!user) {
    return res.status(400).send('User not found');
  }

  if (bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin
      },
      secret,
      {expiresIn: '50d'}
    );
    res.status(200).send({ user: user.email, token: token });
  } else {
    res.status(400).send('Password is wrong');
  }
});

router.post('/register', async (req, res) => {
  let user = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country
  })
  user = await user.save();

  if(!user) {
    return res.status(400).send('User cannot be created')
  }
  res.send(user)
})

router.get('/get/count', async (req, res) => {
  try {
    const userCount = await User.countDocuments();

    res.send({
      userCountCount: userCount,
    });
  } catch (error) {
    console.error('Error counting products:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
