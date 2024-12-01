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

// Obtener datos de sensores por tipo y sensor
const getSensorData = async (type, sensor) => {
  const pool = await connectDB();
  const query = `
    SELECT
      id,
      type,
      section,
      sensor,
      value,
      FORMAT(timestamp, 'yyyy-MM-dd') AS date, -- Extraer fecha en formato estándar
      FORMAT(timestamp, 'HH:mm:ss') AS time   -- Extraer hora en formato estándar
    FROM sensor_data
    WHERE type = @type AND sensor = @sensor
    ORDER BY timestamp ASC;
  `;
  const result = await pool.request()
    .input("type", sql.VarChar, type)
    .input("sensor", sql.VarChar, sensor)
    .query(query);

  return result.recordset;
};



// Obtiene datos por rango de fechas
const getSensorDataByRange = async (type, sensor, startDate, endDate) => {
  const pool = await connectDB();
  const query = `
    SELECT id, type, section, sensor, value, date, time
    FROM sensor_data
    WHERE type = @type AND sensor = @sensor
    AND date BETWEEN @startDate AND @endDate
    ORDER BY date, time ASC;
  `;
  const result = await pool.request()
    .input('type', sql.VarChar, type)
    .input('sensor', sql.VarChar, sensor)
    .input('startDate', sql.Date, startDate)
    .input('endDate', sql.Date, endDate)
    .query(query);
  return result.recordset;
};

module.exports = { insertSensorData, getSensorData, getSensorDataByRange };
