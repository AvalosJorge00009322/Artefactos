const express = require("express");
const router = express.Router();
const {
  storeSensorData,
  fetchSensorData,
  fetchSensorDataByRange,
} = require("../controllers/sensorController");

// Ruta para insertar datos
router.post("/data", storeSensorData);

// Ruta para obtener datos de sensores
router.get("/data", fetchSensorData);

// Ruta para obtener datos por rango de fechas
router.get("/data/range", fetchSensorDataByRange);

module.exports = router;
