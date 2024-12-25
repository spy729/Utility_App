import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Utils/firebaseConfig"; // Firebase config import
import { gsap } from "gsap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    // GSAP Animation for container and form inputs
    gsap.from(containerRef.current, {
      y: -80,
      duration: 0.5,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div
        ref={containerRef}
        className=" bg-blue-500 text-black p-10 rounded-3xl shadow-2xl w-full max-w-lg transform transition duration-500 hover:scale-105"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-black bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
          Login
        </h2>
        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="email" className="text-lg font-medium mb-2 block">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="text-lg font-medium mb-2 block">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-black p-4 rounded-lg hover:from-blue-700 hover:to-blue-500 transition duration-300 ease-in-out"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-6 text-md text-gray-600">
          Don't have an account?{" "}
          <a
            href="/signup"
            className= "text-md text-orange-500 hover:text-yellow-500 font-semibold transition duration-300"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
