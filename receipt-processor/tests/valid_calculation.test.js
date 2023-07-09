const { calculatePoints } = require('../services/receiptService');

describe('calculatePoints', () => {
  test('should calculate the correct points for a receipt', () => {
    const receipt = {
      retailer: 'Target',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Item 1', price: '10.00' },
        { shortDescription: 'Item 2', price: '15.00' },
      ],
      total: '25.00',
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(97);
  });

  test('should calculate the correct points for a receipt', () => {
    const receipt = {
      retailer: 'H&M',
      purchaseDate: '2018-01-10',
      purchaseTime: '13:01',
      items: [
        { shortDescription: 'Item 1', price: '10.00' },
        { shortDescription: 'Item 2', price: '15.00' },
      ],
      total: '25.25',
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(37);
  });
  test('should calculate the correct points for a receipt', () => {
    const receipt = {
      retailer: 'Walden Galleria',
      purchaseDate: '2021-02-31',
      purchaseTime: '15:01',
      items: [
        { shortDescription: 'Item 1', price: '10.25' },
        { shortDescription: 'Item 2', price: '15.00' },
      ],
      total: '10.17',
    };

    const points = calculatePoints(receipt);
    expect(points).toBe(41);
  });
});
