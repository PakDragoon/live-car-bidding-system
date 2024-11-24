const Auction = require('../models/Auction');
const Bid = require('../models/Bid');

const placeBid = async ({ auctionId, userId, amount }) => {
  const auction = await Auction.findByPk(auctionId);

  if (!auction) {
    throw new Error('Auction not found');
  }
  if (amount <= auction.current_price) {
    throw new Error('Bid amount must be higher than the current price');
  }

  // Update auction's current price
  auction.current_price = amount;
  await auction.save();

  // Record the bid
  const bid = await Bid.create({ auctionId, userId, amount });
  return { auction, bid };
};

module.exports = {
  placeBid,
};
