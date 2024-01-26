const express = require('express');
const auctionItemController = require('../controllers/auctionItemController');

const router = express.Router();

router.get('/', auctionItemController.searchAuctionItems);
router.get('/:auction_item_id', auctionItemController.getAuctionItem);
router.post('/', auctionItemController.createAuctionItem);
router.put('/:auction_item_id', auctionItemController.updateAuctionItem);
router.delete('/:auction_item_id', auctionItemController.deleteAuctionItem);

module.exports = router;