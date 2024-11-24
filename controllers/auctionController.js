const auctionService = require('../services/auctionService');

const createAuction = async (req, res) => {
  try {
    const auction = await auctionService.createAuction(req.body);
    res.status(201).json(auction);
  } catch (error) {
    res.status(400).json({ error: error.message });
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

module.exports = {
  createAuction,
  getAuction,
};
