const sql = require('mssql');
const connectDB = require('../config/db');

// Inserta datos en la base de datos
const insertSensorData = async (type, section, sensor, value) => {
  const pool = await connectDB();
  const query = `
    INSERT INTO sensor_data (type, section, sensor, value)
    VALUES (@type, @section, @sensor, @value);
  `;
  await pool.request()
    .input('type', sql.VarChar, type)
    .input('section', sql.VarChar, section)
    .input('sensor', sql.VarChar, sensor)
    .input('value', sql.Float, value)
    .query(query);
};

// Obtiene datos por tipo y fecha
const getSensorData = async (type, date) => {
  const pool = await connectDB();
  const query = `
    SELECT id, type, section, sensor, value, date, time
    FROM sensor_data
    WHERE type = @type AND date = @date
    ORDER BY time ASC;
  `;
  const result = await pool.request()
    .input('type', sql.VarChar, type)
    .input('date', sql.Date, date)
    .query(query);
  return result.recordset;
};

module.exports = { insertSensorData, getSensorData };
