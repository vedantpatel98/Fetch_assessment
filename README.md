# Receipt Processor

Receipt Processor is a web service that processes receipts and calculates the awarded points based on predefined rules.

Download the Node js of any version from https://nodejs.org/en/download.

## API Specification
The API specification for the Receipt Processor is described in the <a href="https://github.com/vedantpatel98/Fetch_assessment/blob/main/receipt-processor/api.yml">api.yml</a> file. It provides details about the endpoints, request payloads, and response formats.

## Installation

To install and run the Receipt Processor, follow these steps:<br><br>
1. Clone the repository:
```yaml
git clone https://github.com/your-username/receipt-processor.git
```
2. Install the dependencies:
```yaml
cd receipt-processor
npm install
```
3. Start the Server:
```yaml
npm start

#If you want to run in developement mode
npm dev 
```

The server will start running on <b>`http://localhost:3000`</b>.

# Files/Folders Description

  <b>```app.js```</b>: Base file to set up and run the <b>Express</b> server.
  
  <b>```@controller/```</b>: To store route handlers.

  <b>```@error/```</b>: Custome error handler.

  <b>```@middleware/```</b>: To handle all other errors and error responses.

  <b>```@routes/```</b>: To create multiple routes.

  <b>```@services/```</b>: To handle the business logic and calculations.

  <b>```@utils/```</b>: Helper module for validation.


# Usage
## Process Receipts
Endpoint: <b>POST /receipts/process</b>

Takes in a JSON receipt and returns a JSON object with an ID for the receipt.

Example Request:
```yaml
POST /receipts/process
Content-Type: application/json

{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Item 1",
      "price": "10.00"
    },
    {
      "shortDescription": "Item 2",
      "price": "15.00"
    }
  ],
  "total": "25.00"
}
```

Example Response:

```yaml
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": "7fb1377b-b223-49d9-a31a-5a02701dd310"
}
```

## Get Points

Endpoint: <b>GET /receipts/:id/points</b>

Retrieves the awarded points for a receipt based on the provided ID.

Example Request:

```yaml
GET /receipts/7fb1377b-b223-49d9-a31a-5a02701dd310/points
```
Example Response:

```yaml
HTTP/1.1 200 OK
Content-Type: application/json

{
  "points": 32
}
```

# Testing

To run the unit tests, use the following command:

```yaml
npm test
```

The tests cover various scenarios and ensure the functionality and correctness of the Receipt Processor. You can also find test cases in <b>example</b> folder.


