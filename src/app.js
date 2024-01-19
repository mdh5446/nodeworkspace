const express = require('express');
const itemRoutes = require('./routes/itemRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use('/api/items', itemRoutes);
app.use(errorHandler);

module.exports = app;