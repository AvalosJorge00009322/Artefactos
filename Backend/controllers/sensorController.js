const { insertSensorData, getSensorData, getSensorDataByRange } = require("../models/sensorModel");
const { successResponse, errorResponse } = require("../utils/response");

// Controlador para insertar datos
const storeSensorData = async (req, res) => {
  const { type, section, sensor, value } = req.body;
  try {
    await insertSensorData(type, section, sensor, value);
    successResponse(res, "Datos almacenados exitosamente");
  } catch (error) {
    errorResponse(res, "Error al almacenar datos", error.message);
  }
};

// Controlador para obtener datos de sensores
const fetchSensorData = async (req, res) => {
  const { type, sensor, startDate, endDate } = req.query;

  try {
    if (!type || !sensor) {
      return res.status(400).json({
        success: false,
        message: "El tipo y el sensor son obligatorios.",
      });
    }

    const data = await getSensorData(type, sensor, startDate, endDate);
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error al obtener datos:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener datos",
      error: error.message || error,
    });
  }
};

// Controlador para obtener datos por rango de fechas
const fetchSensorDataByRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const data = await getSensorDataByRange(startDate, endDate);
    return res.json({ success: true, data });
  } catch (error) {
    console.error("Error al obtener datos por rango:", error.message || error);
    return res.status(500).json({
      success: false,
      message: "Error al obtener datos por rango",
      error: error.message || error,
    });
  }
};

module.exports = { storeSensorData, fetchSensorData, fetchSensorDataByRange };