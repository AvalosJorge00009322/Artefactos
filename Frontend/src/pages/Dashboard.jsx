// import SensorChart from "../components/SensorChart";

// function Dashboard() {
//   return (
//     <main className="min-h-screen bg-gray-100 text-gray-800 p-6">
//       <h1 className="text-3xl font-bold text-center mb-10">Dashboard de Sensores</h1>

//       <div className="container mx-auto space-y-12">
//         {/* Sensores Internos */}
//         <section className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sensores Internos</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <SensorChart type="internal" sensor="temperature" />
//             <SensorChart type="internal" sensor="humidity" />
//           </div>
//         </section>

//         {/* Sensores Externos */}
//         <section className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sensores Externos</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             <SensorChart type="external" sensor="temperature" />
//             <SensorChart type="external" sensor="humidity" />
//             <SensorChart type="external" sensor="light" />
//             <SensorChart type="external" sensor="rain" />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default Dashboard;


import React from "react";
import SensorChart from "../components/SensorChart";

const Dashboard = () => {
  const internalSensors = [
    { type: "internal", sensor: "temperature" },
    { type: "internal", sensor: "humidity" },
  ];
  const externalSensors = [
    { type: "external", sensor: "temperature" },
    { type: "external", sensor: "humidity" },
    { type: "external", sensor: "light" },
    { type: "external", sensor: "rain" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard de Sensores</h1>

      {/* Sensores Internos */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sensores Internos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internalSensors.map((sensor, index) => (
            <SensorChart key={index} type={sensor.type} sensor={sensor.sensor} />
          ))}
        </div>
      </section>

      {/* Sensores Externos */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Sensores Externos</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {externalSensors.map((sensor, index) => (
            <SensorChart key={index} type={sensor.type} sensor={sensor.sensor} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
