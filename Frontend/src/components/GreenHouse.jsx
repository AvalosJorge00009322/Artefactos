import React, { useState } from "react";
import Navbar from "./Navbar";
import { useMqtt } from "../hooks/UseMqtt";
import temperatureIcon from "../icons/thermometer.png";
import humidityIcon from "../icons/humidity.png";
import lightIcon from "../icons/sun.png";
import rainIcon from "../icons/rain.png";

// Funcion para calcular el gradiente segun el valor del sensor
const calculateGradient = (type, value) => {
  if (type === "temperature") {
    if (value < 15) return "from-blue-400 to-blue-600"; // Frio
    if (value <= 30) return "from-green-400 to-green-600"; // Ideal
    return "from-red-400 to-red-600"; // Calor
  }
  if (type === "humidity") {
    if (value < 30) return "from-gray-400 to-gray-600"; // Seco
    if (value <= 70) return "from-green-400 to-green-600"; // Ideal
    return "from-blue-400 to-blue-600"; // Humedo
  }
  if (type === "light") {
    if (value < 200) return "from-gray-400 to-gray-600"; // Baja luz
    if (value <= 800) return "from-yellow-400 to-yellow-600"; // Ideal
    return "from-orange-400 to-orange-600"; // Alta luz
  }
  if (type === "rain") {
    return value === "1" ? "from-blue-400 to-blue-600" : "from-gray-400 to-gray-600";
  }
};

const GreenHouse = () => {
  const { messages } = useMqtt();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <main className="min-h-[100dvh] h-full bg-[#162D1B] text-white p-6">
      <Navbar title="INVERNADERO" />

      <section className="container mx-auto mt-6">
        <h2 className="text-center text-3xl font-bold mb-4">
          Monitoreo Externo del Invernadero
        </h2>

        {/* Tarjetas con datos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-6">
          <div
            className={`bg-gradient-to-r ${calculateGradient(
              "temperature",
              parseFloat(messages["/external/temperature"]) || 0
            )} rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4`}
          >
            <img src={temperatureIcon} alt="Temperatura" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Temperatura Externa</h3>
            <p className="text-3xl font-bold">{messages["/external/temperature"] || "N/A"} °C</p>
          </div>

          <div
            className={`bg-gradient-to-r ${calculateGradient(
              "humidity",
              parseFloat(messages["/external/humidity"]) || 0
            )} rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4`}
          >
            <img src={humidityIcon} alt="Humedad" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Humedad Externa</h3>
            <p className="text-3xl font-bold">{messages["/external/humidity"] || "N/A"} %</p>
          </div>

          <div
            className={`bg-gradient-to-r ${calculateGradient(
              "light",
              parseFloat(messages["/external/light"]) || 0
            )} rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4`}
          >
            <img src={lightIcon} alt="Luz Solar" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Luz Solar</h3>
            <p className="text-3xl font-bold">{messages["/external/light"] || "N/A"} Lux</p>
          </div>

          <div
            className={`bg-gradient-to-r ${calculateGradient(
              "rain",
              messages["/external/rain"] || "0"
            )} rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4`}
          >
            <img src={rainIcon} alt="Lluvia" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Lluvia Detectada</h3>
            <p className="text-3xl font-bold">
              {messages["/external/rain"] === "1" ? "Sí" : "No"}
            </p>
          </div>
        </div>

        {/* Menu Desplegable */}
        <div>
          <button
            onClick={toggleDropdown}
            className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white px-6 py-3 rounded-lg shadow-md focus:outline-none hover:scale-105 transition-transform duration-300 font-semibold"
          >
            {isDropdownOpen ? "Cerrar Información" : "Mas Información"}
          </button>
          {isDropdownOpen && (
            <div className="bg-[#24482C] mt-4 p-6 rounded-lg shadow-lg text-sm max-w-4xl mx-auto space-y-4">
              <h3 className="text-lg font-bold mb-2 text-green-400">Colores por Sensores:</h3>
              <ul className="grid grid-cols-2 gap-4 text-white">
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-blue-400 rounded-full"></span>
                  <strong>Temperatura:</strong> <span>Frío (azul) </span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-green-400 rounded-full"></span>
                  <strong>Ideal: </strong> <span>Verde</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-red-400 rounded-full"></span>
                  <strong>Caliente:</strong> <span>Rojo</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-gray-400 rounded-full"></span>
                  <strong>Seco: </strong> <span>Gris</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-yellow-400 rounded-full"></span>
                  <strong>Baja luz: </strong> <span>Gris</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-4 h-4 bg-orange-400 rounded-full"></span>
                  <strong>Alta Luz: </strong> <span>Naranja</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default GreenHouse;
