const db = require('../models'); // models/index.js 불러오기
const Item = db.Item;
const Sequelize = require('sequelize');
const errorHandler = require('../middlewares/errorHandler');

exports.getItem = async (req, res) => {
  try {
    const { item_id } = req.params;
    const item = await Item.findByPk(item_id);
    res.json(item);
  } catch (error) {
    errorHandler;
  }
};

exports.createItem = async (req, res) => {
  try {
    const obj = {
      item_name : req.body.item_name,
      item_img : req.body.item_img,
      create_date : Date.now(),
    }
    const newItem = await Item.create(obj);
    res.status(201).json(newItem); // 생성된 아이템과 함께 201 상태 코드를 응답
  } catch (error) {
    errorHandler(error, req, res);
  }
};

exports.updateItem = async (req, res) => {
  const { item_id } = req.params; // URL 매개변수에서 아이템 ID를 추출
    const { item_name, item_img } = req.body; // 요청 본문에서 새로운 아이템 이름과 이미지를 추출

    const item = await Item.findByPk(item_id);
    if (!item) {
      return res.status(404).send({ message: 'Item not found' });
    }

    item.item_name = item_name;
    item.item_img = item_img;
    item.update_date = Date.now();
    await item.save();

    res.json(item); // 업데이트된 아이템을 응답

};

exports.deleteItem = async (req, res) => {
  try {
    const { item_id } = req.params; // URL 매개변수에서 아이템 ID를 추출

    const deleted = await Item.destroy({
      where: { item_id: item_id }
    });

    if (!deleted) {
      return res.status(404).send({ message: 'Item not found' });
    }

    res.status(204).send({ message: 'Item is deleted' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

exports.searchItems = async (req, res) => {
  try {
    const { item_name, item_id } = req.query; // 쿼리 파라미터에서 검색 조건을 추출
    const searchConditions = {};

    // item_id가 쿼리 파라미터에 있으면 검색 조건에 추가
    if (item_id) {
      searchConditions.item_id = item_id;
    }

    // item_name이 쿼리 파라미터에 있으면 LIKE 검색 조건을 사용하여 추가
    if (item_name) {
      searchConditions.item_name = {
        [Sequelize.Op.like]: `%${item_name}%`
      };
    }

    // 검색 조건에 맞는 아이템을 데이터베이스에서 찾음
    const items = await Item.findAll({
      where: searchConditions
    });

    // 찾은 아이템을 응답으로 반환
    res.json(items);
  } catch (error) {
    errorHandler(error, req, res);
  }
};