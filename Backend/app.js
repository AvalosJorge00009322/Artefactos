const express = require('express');
const sensorRoutes = require('./routes/sensorRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());

// Rutas
app.use('/sensors', sensorRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;
