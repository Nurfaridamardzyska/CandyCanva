import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI} from '../../api/api'; // Import from your existing api folder

export default function CandyRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const validateForm = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return 'Please fill in all fields';
    }

    if (name.length < 2) {
      return 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }

    if (password.length < 6) {
      return 'Password must be at least 6 characters long';
    }

    if (password !== confirmPassword) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);

    try {
      // Call backend API
      const result = await authAPI.register({
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      if (result.success) {
        setSuccess(true);
        
        // Automatically log in the user after successful registration
        localStorage.setItem('token', result.data.token);
        localStorage.setItem('user', JSON.stringify(result.data.user));
        localStorage.setItem('role', 'user'); // Default role for new users

        // Redirect after successful registration
        setTimeout(() => {
          navigate('/dashboard'); // or wherever you want new users to go
        }, 2000);

      } else {
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-100 to-white p-4">
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
          <div className="bg-pink-100 border border-pink-400 text-pink-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            Registration successful! Redirecting to dashboard...
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all shadow-md ${
                loading
                  ? 'bg-pink-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 active:from-pink-600 active:to-pink-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Registering...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-pink-500 hover:text-pink-700 font-medium transition-colors">
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