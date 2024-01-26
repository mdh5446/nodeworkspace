const Sequelize = require('sequelize');
const connection = require('../db');

const AuctionItem = connection.define('auction_items', {
  auction_item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  stock: Sequelize.INTEGER,
  price: Sequelize.BIGINT,
  status: Sequelize.STRING,
  regist_name: Sequelize.STRING,
  regist_date: Sequelize.DATE,
  update_date: Sequelize.DATE
}, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_0900_ai_ci',
  tableName: 'auction_items', // 데이터베이스의 실제 테이블 이름
  timestamps: false
});

module.exports = AuctionItem;