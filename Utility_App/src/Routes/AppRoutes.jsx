import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../components/Auth/Login";
import Signup from "../components/Auth/Signup";
import Dashboard from "../Pages/Dashboard";
import Inventory from "../Pages/Inventory";
import Expenses from "../Pages/Expenses";
import TodoList from "../Pages/TodoList";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} /> {/* Default route */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/todo" element={<TodoList />} />
        </Routes>
    );
};

export default AppRoutes;

