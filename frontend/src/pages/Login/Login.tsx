import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for routing
import { loginCall } from '@/hooks/LoginCall'; // Ensure this path is correct
import FlickeringGrid from '../../components/ui/flickering-grid'; // Import FlickeringGrid for background
import { Toast } from '../../components/majorComponents/toast';

const Login = () => {
  const router = useNavigate(); // Initialize useNavigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  // Handle form submission for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginCall(email, password);

    const role = response.role
 
      localStorage.setItem("role",role);
      localStorage.setItem('email',email);

    router('/profile')
    Toast("Success","Login Successfully")
    } catch (err) {
      Toast("Failed","Email/Password is incorrect","Try again")
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />

      {/* Login Form Container */}
      <div className="bg-white dark:bg-blue-800/20 shadow-lg rounded-lg p-6 sm:p-8 max-w-xs sm:max-w-sm w-full transform transition-transform duration-300 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-200">Welcome Back!</h2>
       

        <form onSubmit={handleLogin}>
          <div className="mb dark:text-white ">
            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 bg-white border text-sm border-gray-300 dark:bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <div className="mb-4 mt-2">
            <label className="block  text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border bg-white text-sm  border-gray-300 dark:bg-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white mb-6 rounded-md"
          >
            Login
          </button>
          <div className="text-center text-sm">
            New here?
            <Link to="/signup" className="ml-2 text-blue-300 hover:text-blue-500">Sign up</Link>
          </div>
        </form> 
      </div>
    </div>
  );
};

export default Login;
