// Sequelize ORM을 사용한 예시
const Sequelize = require('sequelize');
const connection = require('../db');

const Item = connection.define('items', {
  item_id: {
    type: Sequelize.INTEGER,
    primaryKey: true, // item_id를 기본 키로 설정
    autoIncrement: true // 자동 증가 설정
  },
  item_name: Sequelize.STRING,
  item_img: Sequelize.STRING,
  create_date: Sequelize.DATE,
  update_date: Sequelize.DATE
  // 다른 필드들...
},{
  charset: "utf8", // 한국어 설정
  collate: "utf8_general_ci", // 한국어 설정
  timestamps: false, // createdAt과 updatedAt 비활성화
  // id: false // 기본적으로 id가 필요하지 않은 경우에 사용
});

module.exports = Item;