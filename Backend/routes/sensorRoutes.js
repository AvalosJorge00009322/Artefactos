const express = require('express');
const { storeSensorData, fetchSensorData } = require('../controllers/sensorController');

const router = express.Router();

router.post('/data', storeSensorData); // Endpoint para almacenar datos
router.get('/data', fetchSensorData);  // Endpoint para consultar datos

module.exports = router;
