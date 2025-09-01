import React from 'react';
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';

const Header = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className="fixed top-0 left-0 right-0 bg-gray-950/80 backdrop-blur-lg shadow-2xl z-50 border-b border-gray-800"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-500">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-white tracking-tight hover:text-cyan-400 transition-colors duration-300">
              CareerConnect
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-12">
            <Link
              to="/jobs"
              className="relative text-white font-medium px-3 py-2 group hover:text-cyan-400 transition-colors duration-300"
            >
              Explore Jobs
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to={isAuthenticated && user?.role === "employer" ? "/employer-dashboard" : "/employer-login"}
              className="relative text-white font-medium px-3 py-2 group hover:text-cyan-400 transition-colors duration-300"
            >
              Employers
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/resources"
              className="relative text-white font-medium px-3 py-2 group hover:text-cyan-400 transition-colors duration-300"
            >
              Resources
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-200 font-medium">Hello, {user?.fullName}</span>
                <Link
                  to="/profile"
                  className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-300"
                >
                  Profile
                </Link>
                <Link
                  to="/logout"
                  className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-cyan-500 hover:via-pink-600 hover:to-purple-500 transition-all duration-400 shadow-lg hover:shadow-2xl"
                >
                  Logout
                </Link>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white font-medium px-4 py-2 rounded-lg transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:from-cyan-500 hover:via-pink-600 hover:to-purple-500 transition-all duration-400 shadow-lg hover:shadow-2xl"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

        </div>
      </div>
    </motion.header>
  );
};

export default Header;
