import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
    return (
        <Router>
            <Navbar />
            <AppRoutes />
            <Footer />
        </Router>
    );
};

export default App;
