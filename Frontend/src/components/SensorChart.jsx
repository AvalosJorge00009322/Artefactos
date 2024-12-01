import React, { useState, useEffect } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format } from "date-fns";

// Registra los componentes de Chart.js
ChartJS.register(
  LineElement,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SensorChart = ({ type, sensor, filters }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { startDate, endDate } = filters;
      const url = `http://localhost:3000/sensors/data?type=${type}&sensor=${sensor}&startDate=${startDate || ""}&endDate=${endDate || ""}`;
      const response = await axios.get(url);
      const fetchedData = response.data.data;

      if (fetchedData && fetchedData.length > 0) {
        const labels = fetchedData.map((entry) =>
          format(new Date(`${entry.date}T${entry.time}`), "dd/MM/yyyy HH:mm")
        );
        const values = fetchedData.map((entry) => entry.value);

        setData({
          labels,
          datasets: [
            {
              label: `${sensor.toUpperCase()} (${type.toUpperCase()})`,
              data: values,
              borderColor: sensor === "temperature" ? "rgba(255, 99, 132, 1)" : "rgba(75, 192, 192, 1)",
              backgroundColor:
                sensor === "light"
                  ? "rgba(255, 206, 86, 0.6)"
                  : sensor === "humidity"
                  ? "rgba(54, 162, 235, 0.4)"
                  : sensor === "rain"
                  ? ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]
                  : "rgba(75, 192, 192, 0.2)",
              borderWidth: sensor === "rain" ? 0 : 2,
              fill: sensor !== "light",
            },
          ],
        });
      } else {
        setData(null);
      }
    } catch (err) {
      console.error("Error al obtener datos:", err.message);
      setError("No se pudieron obtener los datos del servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [type, sensor, filters]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h3 className="text-lg font-bold text-center mb-4">
        {sensor.toUpperCase()} ({type.toUpperCase()})
      </h3>
      {loading && <p className="text-center text-gray-600">Cargando datos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {data && (
        <div className="h-64">
          {sensor === "temperature" ? (
            <Line
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Fecha y Hora",
                      font: { size: 14 },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Valor del Sensor",
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          ) : sensor === "humidity" ? (
            <Line
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Fecha y Hora",
                      font: { size: 14 },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Valor del Sensor",
                      font: { size: 14 },
                    },
                  },
                },
                elements: {
                  line: {
                    tension: 0.4,
                  },
                },
              }}
            />
          ) : sensor === "light" ? (
            <Bar
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Fecha y Hora",
                      font: { size: 14 },
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Intensidad de Luz",
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          ) : sensor === "rain" ? (
            <Pie
              data={{
                labels: data.labels,
                datasets: [
                  {
                    data: data.datasets[0].data,
                    backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  title: {
                    display: true,
                    text: "Distribución de Lluvia",
                  },
                },
              }}
            />
          ) : null}
        </div>
      )}
      {!loading && !error && !data && (
        <p className="text-center text-gray-600">No hay datos disponibles para este sensor.</p>
      )}
    </div>
  );
};

export default SensorChart;
