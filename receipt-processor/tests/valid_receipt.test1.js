const { validateReceipt } = require('../utils/validator');

describe('validateReceipt', () => {
  test('should return null for a valid receipt', () => {
    const validReceipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Item 1', price: '10.00' },
        { shortDescription: 'Item 2', price: '15.00' },
      ],
      total: '25.00',
    };

    const result = validateReceipt(validReceipt);
    expect(result).toBeNull();
  })
});