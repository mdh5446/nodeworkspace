const express = require('express');
const itemRoutes = require('./itemRoutes');
const auctionItemRoutes = require('./auctionItemRoutes');

const router = express.Router();

router.use('/items', itemRoutes);
router.use('/auctionItems', auctionItemRoutes);

module.exports = router;