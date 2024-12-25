import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from "../Utils/firebaseConfig";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tasks from Firestore
  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const taskList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setTasks(taskList);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  // Add a new task to Firestore
  const addTask = async () => {
    if (taskInput.trim()) {
      await addDoc(collection(db, "tasks"), {
        text: taskInput,
        completed: false,
      });
      setTaskInput("");
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (taskId, completed) => {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
      completed: !completed,
    });
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-semibold text-center text-blue-400 mb-6">To-Do List</h1>

      <div className="bg-gray-800 p-6 shadow-lg rounded-lg mb-6">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new task"
        />
        <button
          onClick={addTask}
          className="w-full bg-blue-400 text-gray-900 p-3 rounded hover:bg-blue-500 transition"
        >
          Add Task
        </button>
      </div>

      {loading ? (
        <p className="text-gray-100">Loading tasks...</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-4 mb-2 border border-gray-600 rounded-md bg-gray-700 hover:shadow-lg ${
                task.completed ? "bg-green-600" : "bg-gray-800"
              }`}
            >
              <span
                className={`${
                  task.completed ? "line-through text-gray-300" : "text-gray-100"
                } text-lg`}
              >
                {task.text}
              </span>
              <div>
                <button
                  onClick={() => toggleTaskCompletion(task.id, task.completed)}
                  className="text-sm text-blue-400 mr-2 hover:text-blue-500"
                >
                  {task.completed ? "Undo" : "Complete"}
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
