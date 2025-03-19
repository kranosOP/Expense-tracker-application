import React, { useState } from "react";

const ExpenseForm = ({ onAddExpense }) => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !date) return; // Validation
    
    onAddExpense({ amount, category, date, description });
    setAmount("");
    setDate("");
    setDescription("");
  };

  return (
    <div className="card p-3">
      <h4 className="mb-3">Add Expense</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Amount</label>
          <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Category</label>
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
          </select>
        </div>
        <div className="mb-2">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Expense</button>
      </form>
    </div>
  );
};

export default ExpenseForm;



