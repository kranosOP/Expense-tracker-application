import React from "react";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";

const InsightsChart = () => {
  const data = {
    labels: ["Food", "Travel", "Shopping"],
    datasets: [
      {
        data: [300, 200, 100],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="card p-3">
      <h4>Spending Insights</h4>
      <Pie data={data} />
    </div>
  );
};

export default InsightsChart;
