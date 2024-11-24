const { DataTypes, Sequelize  } = require('sequelize');
const sequelize = require('./index');

const Bid = sequelize.define("Bid", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  bid_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  bid_time: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  ip: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
});


module.exports = Bid;
