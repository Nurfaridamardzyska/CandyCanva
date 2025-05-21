import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function CandyRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const { name, email, password, confirmPassword } = formData;

    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Simulate registration
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Registration successful! Please login.');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-white">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border-2 border-pink-200 relative">
        {/* Candy Logo */}
        <div className="flex justify-center mb-6">
          <svg viewBox="0 0 200 120" className="w-64 h-40">
            {/* Background swirl */}
            <path 
              d="M30,60 Q60,10 100,60 T170,60" 
              fill="none" 
              stroke="#FFB6C1" 
              strokeWidth="8" 
              strokeLinecap="round"
            />
            
            {/* Candy stick */}
            <rect x="90" y="60" width="20" height="50" fill="white" stroke="#FF69B4" strokeWidth="2" />
            
            {/* Candy top */}
            <ellipse cx="100" cy="60" rx="40" ry="25" fill="#FF69B4" />
            <ellipse cx="100" cy="60" rx="35" ry="20" fill="white" />
            <path d="M70,60 Q100,30 130,60" stroke="#FF69B4" strokeWidth="3" fill="none" />
            
            {/* Swirl details */}
            <circle cx="80" cy="50" r="5" fill="#FF69B4" />
            <circle cx="120" cy="50" r="5" fill="#FF69B4" />
            <circle cx="100" cy="70" r="5" fill="#FF69B4" />
            
            {/* Text */}
            <text x="100" y="110" textAnchor="middle" fontFamily="Arial" fontWeight="bold" fontSize="16" fill="#FF69B4">
              Sweet Signup
            </text>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-500">Create an Account</h2>

        {error && (
          <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-pink-600 mb-1 font-medium">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Your full name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-pink-600 mb-1 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-pink-600 mb-1 font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="At least 6 characters"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-pink-600 mb-1 font-medium">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
              placeholder="Repeat password"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-pink-500 hover:to-pink-600 transition font-medium shadow-md"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-500 hover:text-pink-700 font-medium">
             Login here
            </Link>
          </p>
        </div>
        
        {/* Decorative candy elements */}
        <div className="hidden md:block absolute -top-4 -left-4 w-8 h-8 rounded-full bg-pink-200"></div>
        <div className="hidden md:block absolute -bottom-4 -right-4 w-12 h-12 rounded-full bg-pink-200"></div>
        
        {/* Small candy dots */}
        <div className="hidden md:block absolute top-12 right-4 w-3 h-3 rounded-full bg-pink-300"></div>
        <div className="hidden md:block absolute bottom-24 left-3 w-4 h-4 rounded-full bg-pink-300"></div>
      </div>
    </div>
  );
}