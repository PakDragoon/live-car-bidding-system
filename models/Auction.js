const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./index');
const Bid = require("./Bid")

const Auction = sequelize.define("Auction", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    starting_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    current_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    start_time: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM("OPEN", "CLOSED", "CANCELLED"),
      defaultValue: "OPEN",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.NOW,
    },
  });
  
  Auction.associate = (models) => {
    Auction.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  Auction.hasMany(Bid, { foreignKey: 'auction_id', as: 'bids' });

module.exports = Auction;
