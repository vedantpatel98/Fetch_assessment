const { validateReceipt } = require('../utils/validator');

describe('validateReceipt', () => {
  test('should return an error message for a receipt with missing items', () => {
    const receiptWithMissingRetailer = {
      retailer: 'Target',  
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      total: '25.00',
    };

    const result = validateReceipt(receiptWithMissingRetailer);
    expect(result).toBe('Items are missing or invalid');
  });
});