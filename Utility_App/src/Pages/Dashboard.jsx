import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap, Power3 } from "gsap";

const Dashboard = () => {
  const navigate = useNavigate();
  const cardsRef = useRef([]);

  useEffect(() => {
    // Advanced GSAP animation for staggered entry of cards
    gsap.from(cardsRef.current, {
      y: 50,
      duration: 1,
      ease: Power3.easeOut,
      stagger: 0.2,
    });
  }, []);

  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white tracking-wide drop-shadow-lg">
        Dashboard
      </h1>
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Inventory Management Option */}
        <div
          ref={addToRefs}
          className="dashboard-option bg-blue-500 text-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/inventory")}
        >
          <h2 className="text-2xl font-bold mb-2">Inventory Management</h2>
          <p className="text-gray-800">
            Keep track of your inventory items efficiently.
          </p>
        </div>

        {/* Expense Management Option */}
        <div
          ref={addToRefs}
          className="dashboard-option bg-blue-400 text-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/expenses")}
        >
          <h2 className="text-2xl font-bold mb-2">Expense Management</h2>
          <p className="text-gray-800">
            Monitor and manage your expenses with ease.
          </p>
        </div>

        {/* To-Do List Option */}
        <div
          ref={addToRefs}
          className="dashboard-option bg-blue-300 text-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
          onClick={() => navigate("/todo")}
        >
          <h2 className="text-2xl font-bold mb-2">To-Do List</h2>
          <p className="text-gray-800">Organize and complete your tasks effectively.</p>
        </div>

    
      </div>
    </div>
  );
};

export default Dashboard;
