
const express = require('express');
const itemsRoutes = require('./routes/items');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(express.json());

// Routes
app.use('/items', itemsRoutes);

// 404 handler
app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// Error handler
app.use(errorHandler);

module.exports = app;
