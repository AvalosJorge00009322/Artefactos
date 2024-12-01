const sql = require("mssql");
const connectDB = require("../config/db");

// Inserta datos en la base de datos
const insertSensorData = async (type, section, sensor, value) => {
  const pool = await connectDB();
  await pool
    .request()
    .input("type", sql.VarChar, type)
    .input("section", sql.VarChar, section)
    .input("sensor", sql.VarChar, sensor)
    .input("value", sql.Float, value)
    .query("INSERT INTO sensor_data (type, section, sensor, value) VALUES (@type, @section, @sensor, @value)");
};

// Obtener datos de los sensores desde la base de datos
const getSensorData = async (type, sensor, startDate, endDate) => {
  const pool = await connectDB();

  let query = `
    SELECT type, sensor, value, FORMAT(timestamp, 'yyyy-MM-dd') AS date,
           FORMAT(timestamp, 'HH:mm:ss') AS time
    FROM sensor_data
    WHERE type = @type AND sensor = @sensor
  `;

  if (startDate) query += ` AND timestamp >= @startDate`;
  if (endDate) query += ` AND timestamp <= @endDate`;

  const request = pool.request();
  request.input("type", sql.VarChar, type);
  request.input("sensor", sql.VarChar, sensor);

  if (startDate) request.input("startDate", sql.DateTime, new Date(startDate));
  if (endDate) request.input("endDate", sql.DateTime, new Date(endDate));

  const result = await request.query(query);

  return result.recordset;
};

// Exportar funciones
module.exports = { insertSensorData, getSensorData };
