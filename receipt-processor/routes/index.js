const router = require('express').Router();
const receiptController = require('../controllers/receiptController');

router.post('/receipts/process', receiptController.processReceipts);
router.get('/receipts/:id/points', receiptController.getPoints);

module.exports = router