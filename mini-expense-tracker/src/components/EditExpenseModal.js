import React, { useState } from "react";

const EditExpenseModal = ({ expense, onClose, onSave }) => {
  const [updatedExpense, setUpdatedExpense] = useState({ ...expense });

  const handleChange = (e) => {
    setUpdatedExpense({
      ...updatedExpense,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(updatedExpense);
  };

  return (
    <div
      className="modal show d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="modal-dialog">
        <div className="modal-content p-3">
          <h4 className="mb-3 text-center">Edit Expense</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                name="amount"
                value={updatedExpense.amount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Category</label>
              <select
                className="form-select"
                name="category"
                value={updatedExpense.category}
                onChange={handleChange}
              >
                <option>Food</option>
                <option>Travel</option>
                <option>Shopping</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                name="date"
                value={updatedExpense.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={updatedExpense.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success w-100">Save</button>
            <button type="button" className="btn btn-secondary w-100 mt-2" onClick={onClose}>Cancel</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExpenseModal;
