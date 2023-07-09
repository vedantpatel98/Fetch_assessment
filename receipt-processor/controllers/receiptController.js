const {v4: uuidv4} = require('uuid');
const receiptService = require('../services/receiptService');
const { validateReceipt } = require('../utils/validator');
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const receipts = {};

exports.processReceipts = asyncWrapper((req, res,next) => {
    const receiptData = req.body;
    const validationError = validateReceipt(receiptData);

    if (validationError) {
        return next(createCustomError(validationError,404));
    }
    const receiptId = uuidv4();
    receipts[receiptId] = receiptData;
    const response = { id: receiptId };
    res.status(200).json(response);
});

exports.getPoints = (req, res,next) => {
    const receiptId = req.params.id;
    if (receiptId in receipts) {
        const receiptData = receipts[receiptId];
        const points = receiptService.calculatePoints(receiptData);
        const response = { points };
        res.status(200).json(response);
    } 
    else {
        return next(createCustomError(`No receipt with id: ${receiptId}`,404))
    }
};

