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

// Controlador para obtener datos de sensores
const fetchSensorData = async (req, res) => {
  const { type, sensor } = req.query;

  try {
    const data = await getSensorData(type, sensor);

    // Validar los datos devueltos
    if (!data || data.length === 0) {
      return successResponse(res, "No se encontraron datos para este sensor", []);
    }

    // Formatear datos si es necesario (opcional, ya formateamos en el modelo)
    successResponse(res, "Datos obtenidos exitosamente", data);
  } catch (error) {
    errorResponse(res, "Error al obtener datos", error.message);
  }
}



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
