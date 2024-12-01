import React from 'react';
import humidityIcon from '../icons/humidity.png';
import temperatureIcon from '../icons/thermometer.png';
import plantImage from '../image/planta.jpg';

const Card = ({ title, temperature, humidity }) => {
  return (
    <div className="bg-[#31643C] text-white rounded-2xl p-6 w-full max-w-[600px] shadow-xl transform hover:scale-105 transition-transform duration-300">
      {/* Título e Imagen */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold flex-1">{title}</h2>
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-gray-700 shadow-md">
          <img src={plantImage} alt="Plant" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Datos de Temperatura y Humedad */}
      <div className="grid grid-cols-2 gap-6">
        {/* Temperatura */}
        <div className="bg-[#3B82F6] text-center p-4 rounded-lg shadow-md">
          <img src={temperatureIcon} alt="Temperature Icon" className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg font-semibold">Temperatura</p>
          <p className="text-2xl font-bold">{temperature !== undefined ? `${temperature}°C` : "N/A"}</p>
          <p className="text-sm mt-2">
            {temperature !== undefined
              ? temperature < 15
                ? "Frío"
                : temperature <= 30
                ? "Ideal"
                : "Calor"
              : "Desconocido"}
          </p>
        </div>

        {/* Humedad */}
        <div className="bg-[#22C55E] text-center p-4 rounded-lg shadow-md">
          <img src={humidityIcon} alt="Humidity Icon" className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg font-semibold">Humedad</p>
          <p className="text-2xl font-bold">{humidity !== undefined ? `${humidity}%` : "N/A"}</p>
          <p className="text-sm mt-2">
            {humidity !== undefined
              ? humidity < 30
                ? "Baja"
                : humidity <= 70
                ? "Normal"
                : "Alta"
              : "Desconocida"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
