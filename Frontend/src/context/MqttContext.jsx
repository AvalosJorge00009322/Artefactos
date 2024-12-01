import { createContext, useEffect, useState } from "react";
import mqtt from "mqtt";

// Crear el contexto
export const MqttContext = createContext();

export const MqttProvider = ({ brokerUrl, options, topics, children }) => {
  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState({}); // Almacenamos el último mensaje por topic
  const [isSubscribed, setIsSubscribed] = useState(false); // Bandera para evitar suscripciones múltiples

  // Conectar al broker MQTT
  useEffect(() => {
    if (!brokerUrl || !options) return;

    // Crear cliente MQTT
    const mqttClient = mqtt.connect(brokerUrl, options);
    setClient(mqttClient);

    // Evento: conexión exitosa
    mqttClient.on("connect", () => {
      console.log("✅ Conectado al broker MQTT");
      
      if (topics && topics.length > 0 && !isSubscribed) {
        if (!mqttClient.disconnecting) {
          mqttClient.subscribe(topics, (err) => {
            if (err) {
              console.error("❌ Error al suscribirse a los topics:", err.message);
            } else {
              console.log("✅ Suscrito a los topics:", topics.join(", "));
              setIsSubscribed(true); // Marcar como suscrito
            }
          });
        } else {
          console.warn("⚠️ El cliente está desconectándose. No se pueden suscribir a los tópicos.");
        }
      }
    });

    // Evento: recibir mensajes
    mqttClient.on("message", (topic, message) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [topic]: message.toString(), // Solo guardamos el último mensaje
      }));
    });

    // Evento: error en la conexión
    mqttClient.on("error", (err) => {
      console.error("❌ Error en la conexión MQTT:", err.message);
    });

    // Evento: desconexión
    mqttClient.on("disconnect", () => {
      console.warn("⚠️ Cliente MQTT desconectado.");
      setIsSubscribed(false); // Reiniciar bandera de suscripción
    });

    // Evento: cerrar conexión
    mqttClient.on("close", () => {
      console.warn("⚠️ Conexión al broker MQTT cerrada.");
    });

    return () => {
      mqttClient.end(); // Desconectar al desmontar el componente
    };
  }, [brokerUrl, options, topics, isSubscribed]);

  // Publicar mensajes a un topic
  const publish = (topic, message) => {
    if (client) {
      client.publish(topic, message, (error) => {
        if (error) {
          console.error("❌ Error al publicar el mensaje:", error.message);
        } else {
          console.log("✅ Mensaje publicado:", message);
        }
      });
    }
  };

  return (
    <MqttContext.Provider value={{ publish, messages }}>
      {children}
    </MqttContext.Provider>
  );
};
