// src/components/Card.jsx
import React from 'react';
import humidityIcon from '../icons/humidity.png';
import temperatureIcon from '../icons/thermometer.png';
import plantImage from '../image/planta.jpg'; 


const Card = ( {title} ) => {
  return (
    <div className="bg-[#D9D9D9] rounded-xl p-6 w-full max-w-[600px] h-[250px] flex items-center space-x-6 shadow-lg">
      <div className="w-24 h-28 md:w-28 md:h-32 rounded-lg overflow-hidden">
      <img src={plantImage} alt="Plant" className="w-full h-full object-cover" />
    </div>

    <div className="flex flex-col space-y-4 flex-1">
        <h2 className="text-black text-3xl text-center font-montserrat font-semibold">{title}</h2>

        <div className="flex items-center">
          <img src={temperatureIcon} alt="Temperature Icon" className="w-6 h-6 md:w-10 md:h-10" />
          <div className="bg-white ml-2 w-full h-8 md:h-6 rounded-full"></div>
        </div>

        <div className="flex items-center">
          <img src={humidityIcon} alt="Humidity Icon" className="w-6 h-6 md:w-10 md:h-10" />
          <div className="bg-white ml-2 w-full h-8 md:h-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
