validateReceipt = (receiptData) => {
  if (!receiptData.retailer || typeof receiptData.retailer !== 'string') {
    return 'Retailer name is missing or invalid';
  }
  if (!receiptData.purchaseDate || !isValidDate(receiptData.purchaseDate)) {
    return 'Purchase date is missing or invalid';
  }
  if (!receiptData.purchaseTime || !isValidTime(receiptData.purchaseTime)) {
    return `Purchase time is missing or invalid`;
  }
  if (!receiptData.items || !Array.isArray(receiptData.items) || receiptData.items.length === 0) {
    return 'Items are missing or invalid';
  }
  if (!receiptData.total || !isValidAmount(receiptData.total)) {
    return 'Total amount is missing or invalid';
  }
  return null; // Validation passed
};

// Helper functions for validation
function isValidDate(date) {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(date);
}

function isValidTime(time) {
  const regex = /^\d{2}:\d{2}$/;
  return regex.test(time);
}

function isValidAmount(amount) {
  const regex = /^\d+(\.\d{1,2})?$/;
  return regex.test(amount);
}

module.exports = { validateReceipt };