const redisClient = require('../config/redisClient');  // Redis client for IP blacklisting
const { Bid, Auction } = require('../models');  // Import the Bid model for saving the bid

let ipBidCount = {};  // In-memory store for rate limiting

const MAX_BIDS_PER_MINUTE = 5; // Max bids allowed per user/IP per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute

// Check if an IP is blacklisted
const checkBlacklistedIp = async (ip, ws) => {
  const isBlacklisted = await redisClient.get(ip);
  if (isBlacklisted) {
    ws.send(JSON.stringify({ error: 'Your IP is blacklisted.' }));
    ws.close();  // Disconnect the WebSocket connection if blacklisted
  }
};

// Rate limiting: Check if the IP exceeds the bid limit
const rateLimitBid = async (ip, ws) => {
  const currentTime = Date.now();

  // Initialize if the IP is not present in the ipBidCount object
  if (!ipBidCount[ip]) {
    ipBidCount[ip] = { count: 0, firstRequestTime: currentTime };
  }

  const timeElapsed = currentTime - ipBidCount[ip].firstRequestTime;

  if (timeElapsed < RATE_LIMIT_WINDOW) {
    if (ipBidCount[ip].count >= MAX_BIDS_PER_MINUTE) {
      await blacklistIp(ip)
      ws.send(JSON.stringify({ error: 'Too many bids placed. Please try again later.' }));
      return;  // Reject the bid if rate limit exceeded
    } else {
      ipBidCount[ip].count++;
    }
  } else {
    ipBidCount[ip] = { count: 1, firstRequestTime: currentTime }; // Reset count after rate limit window
  }
};

const blacklistIp = async (ip) => {
  await redisClient.set(ip, 'blacklisted', 'EX', 86400); // Blacklist for 24 hours
};

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

module.exports = { rateLimitBid, checkBlacklistedIp, placeBid, blacklistIp };
