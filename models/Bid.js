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
  auction_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'auctions',
      key: 'id',
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  ip: {
    type: DataTypes.STRING
  },
}, {
  timestamps: true,
});

Bid.associate = (models) => {
  Bid.belongsTo(models.Auction, { foreignKey: 'auction_id', as: 'auction' });
};

Bid.associate = (models) => {
  Bid.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
};

module.exports = Bid;
