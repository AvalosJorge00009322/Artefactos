const dotenv = require('dotenv');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Validación para asegurar que todas las variables requeridas estén presentes
const requiredEnvVariables = ['DB_USER', 'DB_PASSWORD', 'DB_NAME', 'DB_HOST', 'PORT'];

requiredEnvVariables.forEach((key) => {
  if (!process.env[key]) {
    console.error(`Error: La variable de entorno ${key} no está definida.`);
    process.exit(1); // Termina el proceso si falta una variable requerida
  }
});

console.log('Variables de entorno cargadas correctamente.');

module.exports = dotenv;
