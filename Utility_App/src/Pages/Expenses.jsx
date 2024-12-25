import React, { useState, useEffect } from "react";
import { db } from "../Utils/firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc } from "firebase/firestore";

const Expenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [newExpense, setNewExpense] = useState({ name: "", amount: 0, category: "" });
  const [newTotalAmount, setNewTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const totalDocSnapshot = await getDocs(collection(db, "totalAmount"));
      if (!totalDocSnapshot.empty) {
        totalDocSnapshot.forEach((doc) => {
          setTotalAmount(doc.data().totalAmount);
        });
      } else {
        await setDoc(doc(db, "totalAmount", "totalAmountDoc"), { totalAmount: 1000 });
        setTotalAmount(1000);
      }

      const expensesSnapshot = await getDocs(collection(db, "expenses"));
      const expensesList = [];
      expensesSnapshot.forEach((doc) => {
        expensesList.push(doc.data());
      });
      setExpenses(expensesList);
    };

    fetchData();
  }, []);

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!newExpense.name || newExpense.amount <= 0) {
      alert("Please provide valid expense details.");
      return;
    }

    await addDoc(collection(db, "expenses"), newExpense);
    const newTotalAmountUpdated = totalAmount - newExpense.amount;
    await updateDoc(doc(db, "totalAmount", "totalAmountDoc"), { totalAmount: newTotalAmountUpdated });

    setNewExpense({ name: "", amount: 0, category: "" });
    setTotalAmount(newTotalAmountUpdated);
  };

  const usedAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const leftoverAmount = totalAmount - usedAmount;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-400 mb-6">Expense Management</h1>

      <div className="bg-gray-800 p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Add Expense</h2>
        <form onSubmit={handleAddExpense}>
          <input
            type="text"
            value={newExpense.name}
            onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Expense Name"
            required
          />
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
            className="w-full p-3 mb-4 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            required
          />
          <input
            type="text"
            value={newExpense.category}
            onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Category"
          />
          <button
            type="submit"
            className="w-full bg-blue-400 text-gray-900 p-3 rounded hover:bg-blue-500 transition"
          >
            Add Expense
          </button>
        </form>
      </div>

      <div className="bg-gray-800 p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Expenses List</h2>
        <ul>
          {expenses.map((expense, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 mb-2 border border-gray-600 rounded-md bg-gray-700 hover:shadow-lg"
            >
              <span className="text-gray-100">{expense.name}</span>
              <span className="text-gray-300">{expense.amount} ₹</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Total and Leftover Amount</h2>
        <p className="text-lg font-semibold text-gray-100">Total Amount: {totalAmount} ₹</p>
        <p className="text-lg font-semibold text-gray-100">Used Amount: {usedAmount} ₹</p>
        <p className="text-lg font-semibold text-gray-100">Leftover Amount: {leftoverAmount} ₹</p>
      </div>
    </div>
  );
};

export default Expenses;
