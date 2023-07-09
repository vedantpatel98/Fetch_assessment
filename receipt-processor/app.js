const express = require('express');
const router = require('../routes/index');
const notFound = require('../middleware/not-found');
const errorHandlerMiddleware = require('../middleware/error-handler');

const app = express();
app.use(express.json());
app.use(router);
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});