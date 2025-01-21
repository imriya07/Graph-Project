import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  PointElement
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register Chart.js components
ChartJS.register(
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
  zoomPlugin,
  PointElement

);

const BarChart = () => {
  // State for line chart data
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lineData, setLineData] = useState([]);

  // Bar Chart Data
  const barData = {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Total Time Spent",
        data: [24, 25, 65, 59, 76, 27],
        backgroundColor: ["#6495ED", "#6495ED", "#6495ED", "#6495ED", "#FF7F50", "#6495ED"],
      },

    ],
  };

  // Line Chart Data for features
  const featureTimeTrends = {
    A: [12, 10, 15, 18, 14, 9],
    B: [5, 7, 10, 15, 13, 11],
    C: [14, 16, 12, 20, 18, 14],
    D: [8, 10, 11, 12, 14, 13],
    E: [18, 16, 20, 15, 12, 8],
    F: [6, 9, 10, 12, 8, 7],
  };

  // Options for the bar chart
  const barOptions = {
    onClick: (e, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const feature = barData.labels[index];
        setSelectedFeature(feature); // Set the clicked feature
        setLineData(featureTimeTrends[feature]); // Fetch time trend data
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Features",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Time Spent",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  // Options for the line chart
  const lineOptions = {
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
          text: "Time Spent",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          mode: "x",
        },
      },
      legend: {
        display: true,
      },
    },
  };

  // Line Chart Data
  const lineChartData = {
    labels: ["28-Aug", "29-Aug", "30-Aug", "31-Aug", "1-Sep", "2-Sep"],
    datasets: [
      {
        label: `Time Trend for Feature ${selectedFeature || ""}`,
        data: lineData,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center">Feature Analysis</h3>
      {/* Bar Chart */}
      <Bar data={barData} options={barOptions} />
      <div className="mt-5">
        {/* Line Chart */}
        {selectedFeature && (
          <>
            <h4 className="text-center">
              Time Trend for Feature: {selectedFeature}
            </h4>
            <Line data={lineChartData} options={lineOptions} />
          </>
        )}
      </div>
    </div>
  );
};

export default BarChart;
