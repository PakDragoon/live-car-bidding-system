const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Bid = sequelize.define('Bid', {
  amount: { type: DataTypes.DECIMAL, allowNull: false },
});

module.exports = Bid;
