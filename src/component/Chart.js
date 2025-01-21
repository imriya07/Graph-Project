import React from "react";
import { Bar } from "react-chartjs-2";

const Chart = () => {
  // Chart Data
  const data = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Values",
        data: [24, 25, 65, 59, 76, 27],
        backgroundColor: [
          "#007bff", // Blue
          "#28a745", // Green
          "#ffc107", // Yellow
          "#dc3545", // Red
          "#6610f2", // Purple
          "#17a2b8", // Cyan
        ],
      },
    ],
  };

  // Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Chart;
