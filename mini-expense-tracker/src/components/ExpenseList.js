import React from "react";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
    return (
      <div>
        <h4 className="mb-3 text-center">Expense List</h4>
        {expenses.length === 0 ? (
          <p className="text-center">No expenses added yet.</p>
        ) : (
          <ul className="list-group">
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center bg-dark text-white"
                style={{ borderRadius: "10px", marginBottom: "5px" }}
              >
                <div>
                  <strong>₹{expense.amount}</strong> - {expense.category} <br />
                  <small>{expense.date}</small> | {expense.description}
                </div>
                <div>
                  {/* Edit Button */}
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(expense, index)}
                  >
                    ✏️ Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(index)}
                  >
                    ❌ Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };
  
  export default ExpenseList;



