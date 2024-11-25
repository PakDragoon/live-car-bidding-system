const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

const createAuction = async ({ name, description, starting_price, end_time }) => {
  const auction = await Auction.create({
    name,
    description,
    starting_price,
    current_price: starting_price,
    end_time,
  });
  return auction;
};

const getAllAuctions = async () => {
  const auction = await Auction.findAll()
  if (!auction) {
    throw new Error('Auction not found');
  }
  return auction;
};

const getAuction = async (id) => {
  const auction = await Auction.findByPk(id);
  if (!auction) throw new Error('Auction not found');
  return auction;
};

module.exports = {
  createAuction,
  getAllAuctions,
  getAuction,
};
