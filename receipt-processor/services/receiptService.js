calculatePoints = (receiptData) => {
    let points = 0;

    const retailerName = receiptData.retailer;
    points += retailerName.replace(/[^a-zA-Z0-9]/g, '').length;

    const totalAmount = parseFloat(receiptData.total);
    if (totalAmount === Math.round(totalAmount)) {
        points += 50;
    }

    if (totalAmount % 0.25 === 0) {
        points += 25;
    }

    const numItems = receiptData.items.length;
    points += Math.floor(numItems / 2) * 5;

    receiptData.items.forEach((item) => {
        const trimmedDescriptionLength = item.shortDescription.trim().length;
        if (trimmedDescriptionLength % 3 === 0) {
        const price = parseFloat(item.price);
        const itemPoints = Math.ceil(price * 0.2);
        points += itemPoints;
        }
    });


    const purchaseDate = new Date(receiptData.purchaseDate);
    purchaseDate.setDate(purchaseDate.getDate() + 1);
    if (purchaseDate.getDate() % 2 !== 0) {
        points += 6;
    }

    const purchaseTime = new Date(`1970-01-01 ${receiptData.purchaseTime}`);
    const twoPm = new Date(`1970-01-01 14:00`);
    const fourPm = new Date(`1970-01-01 16:00`);
    if (purchaseTime > twoPm && purchaseTime < fourPm) {
        points += 10;
    }

    return points;
};

module.exports = {calculatePoints};