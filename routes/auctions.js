const express = require('express');
const auctionController = require('../controllers/auctionController');

const router = express.Router();

router.post('/', auctionController.createAuction);
router.get('/all', auctionController.getAllAuctions);
router.get('/:id', auctionController.getAuction);

module.exports = router;
