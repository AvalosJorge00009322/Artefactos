const sql = require('mssql');
const dotenv = require('./dotenv'); // Carga las variables de entorno

// Configuración de conexión a SQL Server
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_HOST,
  options: {
    encrypt: true, // Para conexiones seguras
    trustServerCertificate: true, // Requerido en algunos entornos locales
  },
};

// Función para conectar a la base de datos
const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('✅ Se ha establecido conexión a la base de datos.');
    return pool;
  } catch (error) {
    console.error('❌ Error al conectar a la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
