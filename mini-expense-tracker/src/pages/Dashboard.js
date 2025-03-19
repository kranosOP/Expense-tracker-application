import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import InsightsChart from "../components/InsightsChart";
import EditExpenseModal from "../components/EditExpenseModal";
import { logoutUser } from "../services/apiService"; // 🔹 Import logout function

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate(); // 🔹 For redirection after logout

  // Function to add a new expense
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  // Function to edit expense
  const handleEdit = (expense, index) => {
    setEditingExpense(expense);
    setEditingIndex(index);
  };

  // Function to update edited expense
  const handleUpdateExpense = (updatedExpense) => {
    const updatedExpenses = [...expenses];
    updatedExpenses[editingIndex] = updatedExpense;
    setExpenses(updatedExpenses);
    setEditingExpense(null);
    setEditingIndex(null);
  };

  // Function to delete expense
  const handleDeleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  // 🔹 Handle Logout
  const handleLogout = () => {
    logoutUser();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div
      className="container-fluid vh-100 d-flex flex-column align-items-center text-white py-4"
      style={{
        background: "linear-gradient(135deg, #121212, #1e1e1e)",
        overflowY: "auto",
      }}
    >
      {/* 🔹 Navbar with Logout Button */}
      <div className="d-flex justify-content-between w-100 px-4 py-2">
        <h2
          className="fw-bold"
          style={{
            animation: "fadeIn 1.5s ease-in-out",
            textShadow: "0px 0px 15px rgba(0, 255, 255, 0.8)",
          }}
        >
          Dashboard
        </h2>
        <button
          className="btn btn-danger fw-bold"
          onClick={handleLogout}
          style={{
            transition: "0.3s",
            textShadow: "0px 0px 10px rgba(255, 0, 0, 0.8)",
          }}
        >
          Logout
        </button>
      </div>

      <div className="row w-100 d-flex justify-content-center">
        {/* Expense Form */}
        <div
          className="col-md-5 m-3 p-4 rounded shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            transition: "0.3s",
          }}
        >
          <ExpenseForm onAddExpense={handleAddExpense} />
        </div>

        {/* Insights Chart */}
        <div
          className="col-md-5 m-3 p-4 rounded shadow-lg"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderRadius: "15px",
            border: "2px solid rgba(0, 255, 255, 0.5)",
            transition: "0.3s ease-in-out",
          }}
        >
          <InsightsChart />
        </div>
      </div>

      {/* Expense List */}
      <div
        className="col-10 mt-4 p-4 rounded shadow-lg"
        style={{
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderRadius: "15px",
          border: "2px solid rgba(255, 255, 255, 0.2)",
          animation: "borderGlow 3s infinite alternate",
        }}
      >
        <ExpenseList
          expenses={expenses}
          onEdit={handleEdit}
          onDelete={handleDeleteExpense}
        />
      </div>

      {/* Edit Expense Modal */}
      {editingExpense && (
        <EditExpenseModal
          expense={editingExpense}
          onClose={() => setEditingExpense(null)}
          onSave={handleUpdateExpense}
        />
      )}
    </div>
  );
};

export default Dashboard;






