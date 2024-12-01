import React, { useState } from "react";
import SensorChart from "../components/SensorChart";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [internalFilters, setInternalFilters] = useState({ startDate: "", endDate: "" });
  const [externalFilters, setExternalFilters] = useState({ startDate: "", endDate: "" });
  const [selectedChart, setSelectedChart] = useState(null);

  const handleInternalFilterChange = (e) => {
    const { name, value } = e.target;
    setInternalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleExternalFilterChange = (e) => {
    const { name, value } = e.target;
    setExternalFilters((prev) => ({ ...prev, [name]: value }));
  };

  const openChartModal = (type, sensor, filters) => {
    setSelectedChart({ type, sensor, filters });
  };

  const closeChartModal = () => {
    setSelectedChart(null);
  };

  return (
    <main className="min-h-screen bg-[#162D1B] text-white">
      <Navbar title=" 📊 DASHBOARD" />

      <section className="p-6">
        {/* Sensores Internos */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            <span role="img" aria-label="internos" className="mr-2">🌱</span> Sensores Internos
          </h2>
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div>
              <label className="block text-sm text-gray-300">Desde:</label>
              <input
                type="datetime-local"
                name="startDate"
                value={internalFilters.startDate}
                onChange={handleInternalFilterChange}
                className="border rounded px-2 py-1 text-black"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Hasta:</label>
              <input
                type="datetime-local"
                name="endDate"
                value={internalFilters.endDate}
                onChange={handleInternalFilterChange}
                className="border rounded px-2 py-1 text-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div
              className="bg-gradient-to-r from-green-400 to-green-600 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openChartModal("internal", "temperature", internalFilters)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Temperatura</h3>
              <SensorChart type="internal" sensor="temperature" filters={internalFilters} />
            </div>
            <div
              className="bg-gradient-to-r from-blue-400 to-blue-600 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openChartModal("internal", "humidity", internalFilters)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Humedad</h3>
              <SensorChart type="internal" sensor="humidity" filters={internalFilters} />
            </div>
          </div>
        </section>

        {/* Sensores Externos */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">
            <span role="img" aria-label="externos" className="mr-2">🌎</span> Sensores Externos
          </h2>
          <div className="flex justify-center items-center space-x-6 mb-6">
            <div>
              <label className="block text-sm text-gray-300">Desde:</label>
              <input
                type="datetime-local"
                name="startDate"
                value={externalFilters.startDate}
                onChange={handleExternalFilterChange}
                className="border rounded px-2 py-1 text-black"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Hasta:</label>
              <input
                type="datetime-local"
                name="endDate"
                value={externalFilters.endDate}
                onChange={handleExternalFilterChange}
                className="border rounded px-2 py-1 text-black"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openChartModal("external", "temperature", externalFilters)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Temperatura</h3>
              <SensorChart type="external" sensor="temperature" filters={externalFilters} />
            </div>
            <div
              className="bg-gradient-to-r from-red-400 to-red-600 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openChartModal("external", "humidity", externalFilters)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Humedad</h3>
              <SensorChart type="external" sensor="humidity" filters={externalFilters} />
            </div>
            <div
              className="bg-gradient-to-r from-orange-400 to-orange-600 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openChartModal("external", "light", externalFilters)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Cantidad de Luz</h3>
              <SensorChart type="external" sensor="light" filters={externalFilters} />
            </div>
            <div
              className="bg-gradient-to-r from-gray-400 to-gray-600 shadow-lg rounded-xl p-6 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => openChartModal("external", "rain", externalFilters)}
            >
              <h3 className="text-lg font-semibold text-white mb-4 text-center">Lluvia</h3>
              <SensorChart type="external" sensor="rain" filters={externalFilters} />
            </div>
          </div>
        </section>
      </section>

      {/* Modal para mostrar gráfico ampliado */}
      {selectedChart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
            <button
              className="text-red-600 font-bold text-lg float-right"
              onClick={closeChartModal}
            >
              ×
            </button>
            <h3 className="text-center text-xl font-bold mb-4">
              {selectedChart.sensor.toUpperCase()} ({selectedChart.type.toUpperCase()})
            </h3>
            <div className="h-96">
              <SensorChart
                type={selectedChart.type}
                sensor={selectedChart.sensor}
                filters={selectedChart.filters}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;
