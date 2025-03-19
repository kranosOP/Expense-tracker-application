import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Home = () => {
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  const graphContainerRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy(); // Prevent duplicate charts
    }

    const newChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Rent", "Food", "Entertainment", "Shopping", "Bills"],
        datasets: [
          {
            label: "Monthly Expenses",
            data: [500, 300, 200, 400, 250],
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ab47bc"],
            borderRadius: 8,
          },
        ],
      },
      options: {
        responsive: true,
        animation: {
          duration: 1500,
          easing: "easeInOutQuart",
        },
        plugins: {
          legend: {
            labels: {
              color: "white",
              font: {
                size: 14,
              },
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "white",
            },
          },
          y: {
            ticks: {
              color: "white",
            },
          },
        },
      },
    });

    setChartInstance(newChartInstance);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            chartInstance?.update();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (graphContainerRef.current) {
      observer.observe(graphContainerRef.current);
    }

    return () => observer.disconnect();
  }, [chartInstance]);

  return (
    <div className="container-fluid text-white" style={{ backgroundColor: "#000", minHeight: "100vh", paddingBottom: "50px" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 shadow-sm">
        <div className="container-fluid">
          <h2 className="navbar-brand fw-bold text-warning">Mini Expense Tracker</h2>
          <div>
            <Link to="/login" className="btn btn-outline-warning me-2 fw-bold">
              Login
            </Link>
            <Link to="/register" className="btn btn-warning fw-bold">
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Intro Section */}
      <div className="text-center mt-5 p-4 rounded" style={{ backgroundColor: "#000" }}>
        <h3 className="fw-bold text-warning">Track Your Expenses, Manage Your Budget!</h3>
        <p className="mt-3 text-light lead">
          Mini Expense Tracker helps you record, categorize, and analyze your expenses effortlessly.  
          Stay financially smart by tracking your daily, weekly, and monthly spending.
        </p>

        {/* Feature Cards */}
        <h4 className="mt-4 text-warning"> Why Use This App?</h4>
        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          {[
            { icon: "📊", title: "Real-time Expense Tracking" },
            { icon: "🔍", title: "Detailed Insights & Graphs" },
            { icon: "🔔", title: "Stay in Budget with Alerts" },
            { icon: "📅", title: "Organized Expense History" },
          ].map((feature, index) => (
            <div
              key={index}
              className="p-3 bg-dark rounded shadow text-center feature-card"
              style={{ width: "250px", cursor: "pointer", transition: "transform 0.3s ease-in-out" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <h2>{feature.icon}</h2>
              <p className="fw-bold">{feature.title}</p>
            </div>
          ))}
        </div>

        {/* Animated Expense Graph */}
        <div ref={graphContainerRef} className="mt-5 p-4 bg-dark text-center rounded shadow">
          <h4 className="text-warning">📊 Expense Overview</h4>
          <p className="text-light">Get insights on where your money goes!</p>
          <canvas ref={chartRef}></canvas>
        </div>

        <Link to="/register" className="btn btn-success mt-4 fw-bold shadow-lg">
          Get Started Now!
        </Link>
      </div>
    </div>
  );
};

export default Home;
