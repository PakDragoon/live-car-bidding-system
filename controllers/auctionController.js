const redisClient = require('../config/redisClient'); 
const auctionService = require('../services/auctionService');
const bidService = require('../services/bidService');

const createAuction = async (req, res) => {
  try {
    const auction = await auctionService.createAuction(req.body);
    res.status(201).json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllAuctions = async (req, res) => {
  try {
    const auction = await auctionService.getAllAuctions();
    res.status(200).json(auction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getAuction = async (req, res) => {
  try {
    const auction = await auctionService.getAuction(req.params.id);
    res.status(200).json(auction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getHighestBid = async (req, res) => {
  try {
    const bid = await bidService.getHighestBid(req.params.id);
    res.status(200).json(bid);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getHighestBid,
  createAuction,
  getAllAuctions,
  getAuction,
};
