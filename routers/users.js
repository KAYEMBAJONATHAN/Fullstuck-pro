const { User } = require('../models/user')
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const useerList =  await User.find();

    if(!useerList) {
        res.status(500).json({success: false})
    }
        res.send(useerList);
})

module.exports =router;
