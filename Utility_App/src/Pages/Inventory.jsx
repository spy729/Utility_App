import React, { useState, useEffect } from "react";
import { db } from "../Utils/firebaseConfig";
import { collection, addDoc, getDocs, doc } from "firebase/firestore";

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [reminderItems, setReminderItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: 0 });

  useEffect(() => {
    const fetchInventory = async () => {
      const inventorySnapshot = await getDocs(collection(db, "inventory"));
      const inventoryList = [];
      inventorySnapshot.forEach((doc) => {
        inventoryList.push(doc.data());
      });
      setInventoryItems(inventoryList);
    };
    fetchInventory();
  }, []);

  const handleAddItem = async (e) => {
    e.preventDefault();
    if (!newItem.name || newItem.quantity <= 0) {
      alert("Please provide valid item details.");
      return;
    }

    await addDoc(collection(db, "inventory"), newItem);
    setInventoryItems([...inventoryItems, newItem]);
    setNewItem({ name: "", quantity: 0 });
  };

  const handleAddReminder = (itemName) => {
    // Only add the item to the reminder list if it's not already there
    if (!reminderItems.includes(itemName)) {
      setReminderItems([...reminderItems, itemName]);
    }
  };

  const handleRemoveFromReminder = (itemName) => {
    setReminderItems(reminderItems.filter((item) => item !== itemName));
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-400 mb-6">
        Inventory Management
      </h1>

      <div className="bg-gray-800 p-6 shadow-lg rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Add New Item</h2>
        <form onSubmit={handleAddItem} className="grid gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            className="w-full p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Item Name"
            required
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: Number(e.target.value) })
            }
            className="w-full p-3 border border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Quantity"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-400 text-gray-900 p-3 rounded hover:bg-blue-500 transition"
          >
            Add Item
          </button>
        </form>
      </div>

      <div className="bg-gray-800 p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">Inventory List</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {inventoryItems.map((item, index) => (
            <div
              key={index}
              className="bg-gray-700 p-4 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-100">{item.name}</h3>
              <p className="text-gray-300">Quantity: {item.quantity}</p>
              <button
                onClick={() => handleAddReminder(item.name)}
                className="mt-4 bg-yellow-500 text-gray-900 py-1 px-3 rounded hover:bg-yellow-600 focus:outline-none"
              >
                Add Reminder
              </button>
            </div>
          ))}
        </div>
      </div>

      {reminderItems.length > 0 && (
        <div className="mt-6 bg-gray-800 p-6 shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">Reminder List</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reminderItems.map((item, index) => (
              <div
                key={index}
                className="bg-yellow-200 p-4 rounded-lg border border-gray-600 shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item}</h3>
                <button
                  onClick={() => handleRemoveFromReminder(item)}
                  className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none"
                >
                  Remove Reminder
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;
