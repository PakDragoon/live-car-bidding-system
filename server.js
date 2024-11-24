const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./models/index');
const userRoutes = require('./routes/users');
const auctionRoutes = require('./routes/auctions');
const { WebSocketServer } = require('ws');
const bidHandler = require('./websocket/bidHandler');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/users', userRoutes);
app.use('/auctions', auctionRoutes);

// WebSocket
const server = app.listen(8080, () => console.log('Server started on port 8080'));
const wss = new WebSocketServer({ server });
bidHandler(wss);

// Database Sync
sequelize.sync({ alter: true }).then(() => console.log('Database synced.'));
