const express = require('express');
const cors = require('cors'); // Importa CORS
const sensorRoutes = require('./routes/sensorRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:5173', // Dirección del frontend
}));

// Middleware
app.use(express.json());

// Rutas
app.use('/sensors', sensorRoutes);

// Manejo de errores
app.use(errorHandler);

module.exports = app;
