import React from 'react';
import SensorChart from '../components/SensorChart';

const Dashboard = () => {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard de Sensores</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SensorChart type="internal" sensor="temperature" />
        <SensorChart type="internal" sensor="humidity" />
        <SensorChart type="external" sensor="temperature" />
        <SensorChart type="external" sensor="humidity" />
        <SensorChart type="external" sensor="light" />
        <SensorChart type="external" sensor="rain" />
      </div>
    </main>
  );
};

export default Dashboard;
