const WebSocket = require('ws');
const bidService = require('../services/bidService');

const bidHandler = (wss) => {
  wss.on('connection', (ws) => {
    console.log('WebSocket connected!');

    ws.on('message', async (message) => {
      try {
        const data = JSON.parse(message);

        if (data.type === 'PLACE_BID') {
          const { auctionId, userId, amount } = data;

          // Use the service for placing the bid
          const { auction, bid } = await bidService.placeBid({ auctionId, userId, amount });

          // Broadcast updated bid to all clients
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
