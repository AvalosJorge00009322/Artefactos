const { insertSensorData, getSensorData, getSensorDataByRange } = require('../models/sensorModel');
const { successResponse, errorResponse } = require('../utils/response');

// Controlador para insertar datos
const storeSensorData = async (req, res) => {
  const { type, section, sensor, value } = req.body;

  try {
    await insertSensorData(type, section, sensor, value);
    successResponse(res, 'Datos almacenados exitosamente');
  } catch (error) {
    errorResponse(res, 'Error al almacenar datos', error.message);
  }
};

// Controlador para consultar datos por tipo y fecha específica
const fetchSensorData = async (req, res) => {
  const { type, date } = req.query;

  try {
    const data = await getSensorData(type, date);
    successResponse(res, 'Datos obtenidos exitosamente', data);
  } catch (error) {
    errorResponse(res, 'Error al obtener datos', error.message);
  }
};

// Controlador para consultar datos por rango de fechas
const fetchSensorDataByRange = async (req, res) => {
  const { type, sensor, startDate, endDate } = req.query;

  try {
    const data = await getSensorDataByRange(type, sensor, startDate, endDate);
    successResponse(res, 'Datos obtenidos exitosamente', data);
  } catch (error) {
    errorResponse(res, 'Error al obtener datos por rango de fechas', error.message);
  }
};

module.exports = { storeSensorData, fetchSensorData, fetchSensorDataByRange };
