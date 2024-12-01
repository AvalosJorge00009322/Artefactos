import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { format } from "date-fns";

// Registrar los componentes de Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend, Filler);

const SensorChart = ({ type, sensor }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/sensors/data?type=${type}&sensor=${sensor}`
        );
        const fetchedData = response.data.data;

        if (fetchedData && fetchedData.length > 0) {
          const formattedData = fetchedData.map((entry) => {
            try {
              const dateTime = new Date(`${entry.date}T${entry.time}`);
              if (isNaN(dateTime.getTime())) {
                throw new Error("Fecha no válida");
              }
              return {
                ...entry,
                formattedDate: format(dateTime, "dd MMM yyyy, HH:mm"),
              };
            } catch (error) {
              console.error("Error al procesar la fecha:", error);
              return { ...entry, formattedDate: "Fecha Inválida" };
            }
          });

          setData({
            labels: formattedData.map((entry) => entry.formattedDate),
            datasets: [
              {
                label: `${sensor} (${type})`,
                data: formattedData.map((entry) => entry.value),
                borderColor:
                  sensor === "temperature"
                    ? "#FF5733"
                    : sensor === "humidity"
                    ? "#33B5FF"
                    : sensor === "light"
                    ? "#FFC300"
                    : "#8D33FF",
                backgroundColor:
                  sensor === "temperature"
                    ? "rgba(255, 87, 51, 0.2)"
                    : sensor === "humidity"
                    ? "rgba(51, 181, 255, 0.2)"
                    : sensor === "light"
                    ? "rgba(255, 195, 0, 0.2)"
                    : "rgba(141, 51, 255, 0.2)",
                borderWidth: 2,
                fill: true,
                tension: 0.4,
              },
            ],
          });
        } else {
          setData(null); // Sin datos
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setData(null);
      }
    };

    fetchData();
  }, [type, sensor]);

  if (!data) {
    return (
      <div className="text-center text-gray-500 p-4 border rounded-md shadow-md bg-gray-50">
        <p>No hay datos disponibles para este sensor.</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg shadow-lg bg-white">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: { size: 14 },
                color: "#333",
              },
            },
            title: {
              display: true,
              text: `${sensor} (${type})`,
              font: { size: 16 },
              color: "#111",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Fecha y Hora",
                font: { size: 14 },
                color: "#666",
              },
              ticks: {
                color: "#333",
              },
            },
            y: {
              title: {
                display: true,
                text: "Valor del Sensor",
                font: { size: 14 },
                color: "#666",
              },
              ticks: {
                color: "#333",
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SensorChart;

