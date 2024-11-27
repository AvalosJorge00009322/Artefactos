import React from 'react';
import humidityIcon from '../icons/humidity.png';
import temperatureIcon from '../icons/thermometer.png';
import plantImage from '../image/planta.jpg';

const Card = ({ title, temperature, humidity }) => {
  return (
    <div className="bg-[#2f603a] text-white rounded-2xl p-6 w-full max-w-[600px] shadow-xl transform hover:scale-105 transition-transform duration-300">
      {/* Título e Imagen */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex-1">{title}</h2>
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-700">
          <img src={plantImage} alt="Plant" className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Datos de Temperatura y Humedad */}
      <div className="grid grid-cols-2 gap-4">
        {/* Temperatura */}
        <div className="bg-[#3B82F6] text-center p-4 rounded-lg shadow-md">
          <img src={temperatureIcon} alt="Temperature Icon" className="w-10 h-10 mx-auto mb-2" />
          <p className="text-sm font-semibold">Temperatura</p>
          <p className="text-xl font-bold">{temperature || "N/A"}°C</p>
        </div>

        {/* Humedad */}
        <div className="bg-[#22C55E] text-center p-4 rounded-lg shadow-md">
          <img src={humidityIcon} alt="Humidity Icon" className="w-10 h-10 mx-auto mb-2" />
          <p className="text-sm font-semibold">Humedad</p>
          <p className="text-xl font-bold">{humidity || "N/A"}%</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
