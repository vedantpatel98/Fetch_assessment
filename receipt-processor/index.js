const router = require('express').Router();
const {v4: uuidv4} = require('uuid');

const receipts = {};

// Process Receipts
router.post('/receipts/process',(req, res) => {

  //Validate JSON Schema
  const receiptData = req.body;
  const retailer = receiptData.retailer;
  const purchaseDate = receiptData.purchaseDate;
  var timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const purchaseTime = receiptData.purchaseTime;
  const total = receiptData.total;
  const item = receiptData.items;

  try
  {
    // Generate a unique ID for the receipt
    if(!retailer || !purchaseDate || !purchaseTime || !total || !item || typeof retailer!=="string" || retailer.length<=0||new Date(purchaseDate).toString()==="Invalid Date" || new Date(purchaseDate)==""||!timeRegex.test(purchaseTime)||typeof total!=="string" || total.length<=0||item.length<=0){
      for(let i = 0;i<item.length;i++){
        if(!item[i].shortDescription||typeof item[i].length<=0||!item[i].price||typeof item[i].price!=='number'||isNaN(item[i].price)){
          res.status(400).json("Not able to meet required properties");
        }
      }
    }
    else{
      const receiptId = uuidv4();

      // Store the receipt data in memory
      receipts[receiptId] = receiptData;

      // Return the ID of the processed receipt
      const response = { id: receiptId };
      res.status(200).json(response);
    }
  }
  catch
  {
    res.status(400).json('The receipt is invalid');
  }
});

// Get Points
router.get('/receipts/:id/points', (req, res) => {
  const receiptId = req.params.id;

  // Look up the receipt data associated with the ID
  if (receiptId in receipts) {
    // Calculate the points based on your logic
    const receiptData = receipts[receiptId];

    // Calculate the points based on the provided rules
    let points = 0;

    // One point for every alphanumeric character in the retailer name
    const retailerName = receiptData.retailer;
    points += retailerName.replace(/[^a-zA-Z0-9]/g, '').length;

    // 50 points if the total is a round dollar amount with no cents
    const totalAmount = parseFloat(receiptData.total);
    if (totalAmount === Math.round(totalAmount)) {
      points += 50;
    }

    // 25 points if the total is a multiple of 0.25
    if (totalAmount % 0.25 === 0) {
      points += 25;
    }

    // 5 points for every two items on the receipt
    const numItems = receiptData.items.length;
    points += Math.floor(numItems / 2) * 5;

    // If the trimmed length of the item description is a multiple of 3,
    // multiply the price by 0.2 and round up to the nearest integer.
    // The result is the number of points earned.
    receiptData.items.forEach((item) => {
      const trimmedDescriptionLength = item.shortDescription.trim().length;
      if (trimmedDescriptionLength % 3 === 0) {
        const price = parseFloat(item.price);
        const itemPoints = Math.ceil(price * 0.2);
        points += itemPoints;
      }
    });

    // 6 points if the day in the purchase date is odd
    let purchaseDate = new Date(receiptData.purchaseDate);
    purchaseDate = new Date( purchaseDate.getTime() + Math.abs(purchaseDate.getTimezoneOffset()*60000));
    if (purchaseDate.getDate() % 2 !== 0) {
      points += 6;
    }

    // 10 points if the time of` purchase is after 2:00pm and before 4:00pm
    const purchaseTime = new Date(`1970-01-01 ${receiptData.purchaseTime}`);
    const twoPm = new Date(`1970-01-01 14:00`);
    const fourPm = new Date(`1970-01-01 16:00`);
    if (purchaseTime > twoPm && purchaseTime < fourPm) {
      points += 10;
    }
    
    // Return the awarded points
    const response = { points };
    res.status(200).json(response);
  } else {
    // If receipt is not found, return a 404 response
    res.status(404).send('No receipt found for that ID');
  }
});

module.exports = router