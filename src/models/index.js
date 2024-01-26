const db = {};

// 모델 불러오기
db.Item = require('./items');
db.AuctionItem = require('./auctionItems');

// 모델 간 관계 설정
// Item과 AuctionItem 간의 1:N 관계 설정
db.Item.hasMany(db.AuctionItem, { foreignKey: 'item_id', as: 'auctionItems' });
db.AuctionItem.belongsTo(db.Item, { foreignKey: 'item_id', as: 'item' });

module.exports = db;