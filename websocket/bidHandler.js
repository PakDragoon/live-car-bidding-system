const WebSocket = require('ws');
const { placeBid, rateLimitBid, checkBlacklistedIp } = require('../services/bidService');

const bidHandler = (wss) => {
  wss.on('connection', (ws) => {
    const ip = req.socket.remoteAddress;  // Get the IP address of the connected user
    // Check blacklisting and rate limit
    checkBlacklistedIp(ip, ws);
    rateLimitBid(ip, ws);
    console.log('WebSocket connected!');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'PLACE_BID') {
          const { auctionId, userId, amount } = data;

          // Use the service for placing the bid
          const { auction, bid } = await placeBid({ auctionId, userId, amount, ip });

          // Broadcast updated bid to all clients
          // ws.broadcast(JSON.stringify({ type: 'NEW_BID', amount }));
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(JSON.stringify({ type: 'NEW_BID', auctionId, amount, userId }));
            }
          });
        }
      } catch (error) {
        ws.send(JSON.stringify({ type: 'ERROR', message: error.message }));
      }
    });

    ws.on('close', () => console.log('WebSocket disconnected.'));
  });
};

module.exports = bidHandler;
