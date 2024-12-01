const express = require('express');
const cors = require('cors');
const sensorRoutes = require('./routes/sensorRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Direccion del frontend
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/sensors', sensorRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;
