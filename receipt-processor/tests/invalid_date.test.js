const { validateReceipt } = require('../utils/validator');

describe('validateReceipt', () => {
  test('should return an error message for a invalid date', () => {
    const validReceipt = {
      retailer: 'Target',
      purchaseDate: 'hello',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Item 1', price: '10.00' },
        { shortDescription: 'Item 2', price: '15.00' },
      ],
      total: '25.00',
    };

    const result = validateReceipt(validReceipt);
    expect(result).toBe('Purchase date is missing or invalid');
  })
});