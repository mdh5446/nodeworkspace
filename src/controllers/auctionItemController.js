const db = require('../models'); // models/index.js 불러오기
const AuctionItem = db.AuctionItem;
const Item = db.Item;
const Sequelize = require('sequelize');
const errorHandler = require('../middlewares/errorHandler');

// AuctionItem 생성
exports.createAuctionItem = async (req, res) => {
  try {
    const { item_id, stock, price, status, regist_name, regist_date, update_date } = req.body;
    const newAuctionItem = await AuctionItem.create({
      item_id,
      stock,
      price,
      status,
      regist_name,
      regist_date: regist_date || new Date(),
      update_date: update_date || new Date()
    });
    res.status(201).json(newAuctionItem);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// AuctionItem 상세 조회
exports.getAuctionItem = async (req, res) => {
    try {
        const { auction_item_id } = req.params;
        const auctionItem = await AuctionItem.findByPk(auction_item_id, {
        include: [{ model: Item, as: 'item' }]
        });
        if (!auctionItem) {
        return res.status(404).send({ message: 'Auction Item not found' });
        }
        res.json(auctionItem);
    } catch (error) {
        errorHandler(error, req, res);
    }
};

// AuctionItem 수정
exports.updateAuctionItem = async (req, res) => {
  try {
    const { auction_item_id } = req.params;
    const { stock, price, status, update_date } = req.body;
    const auctionItem = await AuctionItem.findByPk(auction_item_id);
    if (!auctionItem) {
      return res.status(404).send({ message: 'Auction Item not found' });
    }

    auctionItem.stock = stock;
    auctionItem.price = price;
    auctionItem.status = status;
    auctionItem.update_date = update_date || new Date();
    await auctionItem.save();

    res.json(auctionItem);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

// AuctionItem 삭제
exports.deleteAuctionItem = async (req, res) => {
  try {
    const { auction_item_id } = req.params;
    const deleted = await AuctionItem.destroy({
      where: { auction_item_id: auction_item_id }
    });

    if (!deleted) {
      return res.status(404).send({ message: 'Auction Item not found' });
    }

    res.status(204).send({ message: 'Auction Item is deleted' });
  } catch (error) {
    errorHandler(error, req, res);
  }
};

//AuctionItems 조회
exports.searchAuctionItems = async (req, res) => {
    try {
      const { item_name, item_id, auction_item_id, price, status } = req.query; // 쿼리 파라미터에서 검색 조건을 추출
      const searchConditions = {};
      const itemConditions = {};
  
      // item_id가 쿼리 파라미터에 있으면 검색 조건에 추가
      if (item_id) {
        searchConditions.item_id = item_id;
      }
  
      // auction_item_id가 쿼리 파라미터에 있으면 검색 조건에 추가
      if (auction_item_id) {
        searchConditions.auction_item_id = auction_item_id;
      }
  
      // price가 쿼리 파라미터에 있으면 검색 조건에 추가
      if (price) {
        searchConditions.price = price;
      }
  
      // status가 쿼리 파라미터에 있으면 검색 조건에 추가
      if (status) {
        searchConditions.status = status;
      }
  
      // item_name이 쿼리 파라미터에 있으면 LIKE 검색 조건을 사용하여 추가
      if (item_name) {
        itemConditions.item_name = {
          [Sequelize.Op.like]: `%${item_name}%`
        };
      }
  
      // 검색 조건에 맞는 auction_items을 데이터베이스에서 찾음
      const auctionItems = await AuctionItem.findAll({
        where: searchConditions,
        include: [{
          model: Item,
          as: 'item',
          where: itemConditions,
          required: !!item_name // item_name 검색 조건이 있을 때만 JOIN 수행
        }]
      });
  
      // 찾은 auction_items을 응답으로 반환
      res.json(auctionItems);
    } catch (error) {
      errorHandler(error, req, res);
    }
  };