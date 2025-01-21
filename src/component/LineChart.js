import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ feature }) => {
  // Example time-trend data for the selected feature
  const timeTrendData = {
    A: [12, 15, 14, 20, 16],
    B: [10, 18, 12, 14, 19],
    C: [5, 8, 6, 7, 10],
    D: [25, 22, 20, 24, 30],
    E: [8, 7, 10, 9, 12],
    F: [18, 16, 20, 15, 14],
  };

  const lineData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
    datasets: [
      {
        label: `Time Trend for Feature ${feature}`,
        data: timeTrendData[feature] || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: "Time Range",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  return <Line data={lineData} options={options} />;
};

export default LineChart;
