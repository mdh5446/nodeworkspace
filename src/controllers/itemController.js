const Item = require('../models/items');
const errorHandler = require('../middlewares/errorHandler');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    errorHandler;
  }
};

exports.createItem = async (req, res) => {
  // 사용자 생성 로직
};