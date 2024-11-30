const express = require('express');
const { storeSensorData, fetchSensorData, fetchSensorDataByRange } = require('../controllers/sensorController');

const router = express.Router();

router.post('/data', storeSensorData); // Endpoint para almacenar datos
router.get('/data', fetchSensorData);  // Endpoint para consultar datos por fecha específica
router.get('/data/range', fetchSensorDataByRange); // Endpoint para consultar datos por rango de fechas

module.exports = router;
