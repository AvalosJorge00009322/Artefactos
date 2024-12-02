const mqtt = require('mqtt');
const axios = require('axios');

// Configuracion del cliente MQTT
const client = mqtt.connect('ws://10.149.31.77:9001', {
  username: 'avalosjorge',
  password: 'Root1234',
});

// Topicos de suscripcion
const topics = [
  "/external/temperature",
  "/external/humidity",
  "/external/light",
  "/external/rain",
  "/internal/section1/temperature",
  "/internal/section2/temperature",
  "/internal/section3/temperature",
  "/internal/section4/temperature",
  "/internal/section1/humidity",
  "/internal/section2/humidity",
  "/internal/section3/humidity",
  "/internal/section4/humidity",
];

// Conectar al broker MQTT
client.on('connect', () => {
  console.log('✅ Conectado al broker MQTT');
  client.subscribe(topics, (err) => {
    if (err) {
      console.error('❌ Error al suscribirse a los tópicos:', err.message);
    } else {
      console.log('📋 Suscrito a los tópicos:', topics.join(', '));
    }
  });
});

// Manejar mensajes recibidos
client.on('message', async (topic, message) => {
  try {
    const [type, section, sensor] = topic.split('/').slice(1);
    const value = parseFloat(message.toString());

    if (isNaN(value)) {
      console.warn(`⚠️ Mensaje inválido recibido en ${topic}: ${message}`);
      return;
    }

    const response = await axios.post('http://localhost:3000/sensors/data', {
      type,
      section: section || null,
      sensor,
      value,
    });

    console.log(`✅ Datos almacenados: ${topic} - ${value}`);
  } catch (error) {
    console.error('❌ Error al enviar datos a la API:', error.message);
  }
});

// Manejo de eventos de conexión
client.on('reconnect', () => {
  console.log('🔄 Intentando reconectar al broker MQTT...');
});

client.on('close', () => {
  console.log('❌ Conexión al broker MQTT cerrada.');
});

client.on('error', (err) => {
  console.error('❌ Error en la conexión MQTT:', err.message);
});

module.exports = client;
