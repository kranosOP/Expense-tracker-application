const Expense = require("../models/Expense");

// Add Expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;
    const expense = new Expense({ userId: req.userId, amount, category, date, description });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Expense
exports.updateExpense = async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Expense
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
