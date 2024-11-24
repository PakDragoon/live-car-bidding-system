const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Auction = sequelize.define('Auction', {
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  starting_price: { type: DataTypes.DECIMAL, allowNull: false },
  current_price: { type: DataTypes.DECIMAL },
  end_time: { type: DataTypes.DATE, allowNull: false },
});

module.exports = Auction;
