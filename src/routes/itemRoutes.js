const express = require('express');
const itemController = require('../controllers/itemController');

const router = express.Router();

router.get('/', itemController.searchItems);
router.get('/:item_id', itemController.getItem);
router.post('/', itemController.createItem);
router.put('/:item_id', itemController.updateItem);
router.delete('/:item_id', itemController.deleteItem);

module.exports = router;