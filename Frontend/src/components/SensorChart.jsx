import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const SensorChart = ({ type, sensor }) => {
  const [chartData, setChartData] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('/sensors/data/range', {
        params: {
          type,
          sensor,
          startDate,
          endDate,
        },
      });
      const data = response.data.data;

      const labels = data.map((item) => `${item.date} ${item.time}`);
      const values = data.map((item) => item.value);

      setChartData({
        labels,
        datasets: [
          {
            label: `${sensor} (${type})`,
            data: values,
            borderColor: 'rgba(75,192,192,1)',
            backgroundColor: 'rgba(75,192,192,0.2)',
          },
        ],
      });
    } catch (error) {
      console.error('Error al obtener datos:', error.message);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Reporte: {sensor}</h2>
      <div className="mb-4">
        <label className="mr-2">Desde:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded"
        />
        <label className="ml-4 mr-2">Hasta:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded"
        />
      </div>
      {chartData ? (
        <Line data={chartData} />
      ) : (
        <p className="text-center">Selecciona un rango de fechas para ver el reporte.</p>
      )}
    </div>
  );
};

export default SensorChart;
