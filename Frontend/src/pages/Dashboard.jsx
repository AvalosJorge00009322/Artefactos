import React, { useState } from "react";
import SensorChart from "../components/SensorChart";
import { FiThermometer, FiDroplet, FiCloudRain, FiSun } from "react-icons/fi";

const Dashboard = () => {
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
          <FiSun className="text-blue-500" />
          Dashboard de Sensores
        </h1>
        <p className="text-gray-600">Monitoreo en tiempo real de sensores internos y externos</p>
      </header>

      {/* Filtros Globales */}
      <section className="mb-8">
        <div className="flex items-center gap-4 justify-center">
          <label>
            <span className="block text-gray-600">Desde:</span>
            <input
              type="datetime-local"
              name="startDate"
              value={filters.startDate}
              onChange={handleFilterChange}
              className="border rounded px-2 py-1 shadow-sm"
            />
          </label>
          <label>
            <span className="block text-gray-600">Hasta:</span>
            <input
              type="datetime-local"
              name="endDate"
              value={filters.endDate}
              onChange={handleFilterChange}
              className="border rounded px-2 py-1 shadow-sm"
            />
          </label>
        </div>
      </section>

      {/* Sensores Internos */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-600">
          <FiThermometer />
          Sensores Internos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SensorChart type="internal" sensor="temperature" filters={filters} />
          <SensorChart type="internal" sensor="humidity" filters={filters} />
        </div>
      </section>

      {/* Sensores Externos */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-blue-600">
          <FiCloudRain />
          Sensores Externos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SensorChart type="external" sensor="temperature" filters={filters} />
          <SensorChart type="external" sensor="humidity" filters={filters} />
          <SensorChart type="external" sensor="light" filters={filters} />
          <SensorChart type="external" sensor="rain" filters={filters} />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
