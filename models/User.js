const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('./index');
const Auction = require("./Auction")
const Bid = require("./Bid")

const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
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
  
  User.hasMany(Auction, { foreignKey: 'user_id', as: 'auctions' });
  User.hasMany(Bid, { foreignKey: 'user_id', as: 'bids' });

module.exports = User;
