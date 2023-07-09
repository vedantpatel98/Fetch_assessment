const { validateReceipt } = require('../utils/validator');

describe('validateReceipt', () => {  
  test('should return an error message for a receipt with missing total', () => {
    const receiptWithMissingRetailer = {
      retailer: 'Target',  
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Item 1', price: '10.00' },
        { shortDescription: 'Item 2', price: '15.00' },
      ]
    };

    const result = validateReceipt(receiptWithMissingRetailer);
    expect(result).toBe('Total amount is missing or invalid');
  });
});