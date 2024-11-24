const express = require('express');
const auctionController = require('../controllers/auctionController');

const router = express.Router();

router.post('/', auctionController.createAuction);
router.get('/:id', auctionController.getAuction);

module.exports = router;
