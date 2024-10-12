import React from 'react';
import { Link } from 'react-router-dom';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">My App</h1>
          <div className="space-x-4">
            <Link to="/login" className="nav-link text-blue-600 hover:text-blue-800 transition duration-200">Login</Link>
            <Link to="/register" className="nav-link text-blue-600 hover:text-blue-800 transition duration-200">Register</Link>
            <Link to="/quotes" className="nav-link text-blue-600 hover:text-blue-800 transition duration-200">Quotes</Link>
          </div>
        </div>
      </nav>
      <main className="flex-grow container mx-auto relative">
        {children}
      </main>

      <footer className="bg-gray-200 py-4 text-center">
        <p className="text-gray-600">© {new Date().getFullYear()} My App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;