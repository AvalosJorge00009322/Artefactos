// import React from "react";
// import Navbar from "./Navbar";
// import { useMqtt } from "../hooks/UseMqtt";
// import temperatureIcon from "../icons/thermometer.png";
// import humidityIcon from "../icons/humidity.png";
// import lightIcon from "../icons/sun.png";
// import rainIcon from "../icons/rain.png";

// const GreenHouse = () => {
//   const { messages } = useMqtt();

//   return (
//     <main className="min-h-[100dvh] h-full bg-[#162D1B] text-white p-6">
//       <Navbar title="MONITOREO EXTERNO DEL INVERNADERO" />

//       <section className="container mx-auto mt-6">
//         <h2 className="text-center text-3xl font-bold mb-8">
//           Información Externa
//         </h2>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {/* Tarjeta para Temperatura Externa */}
//           <div className="bg-gradient-to-r from-blue-500 via-green-500 to-green-600 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
//             <img src={temperatureIcon} alt="Temperatura" className="w-16 h-16" />
//             <h3 className="text-lg font-semibold">Temperatura Externa</h3>
//             <p className="text-3xl font-bold">{messages["/external/temperature"] || "N/A"}°C</p>
//           </div>

//           {/* Tarjeta para Humedad Externa */}
//           <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
//             <img src={humidityIcon} alt="Humedad" className="w-16 h-16" />
//             <h3 className="text-lg font-semibold">Humedad Externa</h3>
//             <p className="text-3xl font-bold">{messages["/external/humidity"] || "N/A"}%</p>
//           </div>

//           {/* Tarjeta para Luz Solar */}
//           <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
//             <img src={lightIcon} alt="Luz Solar" className="w-16 h-16" />
//             <h3 className="text-lg font-semibold">Luz Solar</h3>
//             <p className="text-3xl font-bold">{messages["/external/light"] || "N/A"} Lux</p>
//           </div>

//           {/* Tarjeta para Lluvia */}
//           <div className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
//             <img src={rainIcon} alt="Lluvia" className="w-16 h-16" />
//             <h3 className="text-lg font-semibold">Lluvia Detectada</h3>
//             <p className="text-3xl font-bold">
//               {messages["/external/rain"] === "1" ? "Sí" : "No"}
//             </p>
//           </div>
//         </div>
//       </section>
//     </main>
//   );
// };

// export default GreenHouse;


import React from "react";
import Navbar from "./Navbar";
import { useMqtt } from "../hooks/UseMqtt";
import temperatureIcon from "../icons/thermometer.png";
import humidityIcon from "../icons/humidity.png";
import lightIcon from "../icons/sun.png";
import rainIcon from "../icons/rain.png";

const GreenHouse = () => {
  const { messages } = useMqtt();

  return (
    <main className="min-h-[100dvh] h-full bg-[#162D1B] text-white p-6">
      <Navbar title="INVERNADERO" />

      <section className="container mx-auto mt-6">
        <h2 className="text-center text-3xl font-bold mb-8">
          Monitoreo Externo del Invernadero
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Tarjeta para la temperatura externa */}
          <div className="bg-gradient-to-r from-blue-500 via-green-500 to-green-600 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
            <img src={temperatureIcon} alt="Temperatura" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Temperatura Externa</h3>
            <p className="text-3xl font-bold">{messages["/external/temperature"] || "N/A"} °C</p>
          </div>

          {/* Tarjeta para la humedad externa */}
          <div className="bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
            <img src={humidityIcon} alt="Humedad" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Humedad Externa</h3>
            <p className="text-3xl font-bold">{messages["/external/humidity"] || "N/A"} %</p>
          </div>

          {/* Tarjeta para la luz solar */}
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-orange-600 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
            <img src={lightIcon} alt="Luz Solar" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Luz Solar</h3>
            <p className="text-3xl font-bold">{messages["/external/light"] || "N/A"} </p>
          </div>

          {/* Tarjeta para la lluvia */}
          <div className="bg-gradient-to-r from-gray-400 via-gray-600 to-gray-700 rounded-2xl p-6 shadow-xl flex flex-col items-center transform hover:scale-105 transition-transform duration-300 space-y-4">
            <img src={rainIcon} alt="Lluvia" className="w-16 h-16" />
            <h3 className="text-lg font-semibold">Lluvia Detectada</h3>
            <p className="text-3xl font-bold">
              {messages["/external/rain"] === "1" ? "Sí" : "No"}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default GreenHouse;
