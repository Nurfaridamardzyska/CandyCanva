import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../api/api'; // Import from your existing api folder

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Call backend API
      const result = await authAPI.login({
        email: formData.email,
        password: formData.password
        
      });

      console.log('Login result:', result);
      

      if (result.token && result.user) {
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('role', result.user.role || 'user');

      setSuccess(true);

      setTimeout(() => {
        navigate(result.user.role === 'admin' ? '/admin' : '/dashboard');
      }, 1000);
    } else {
      setError('Login failed. Invalid credentials or server error.');
    }

    } catch (err) {
      setError('Login failed. Invalid credentials or server error.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }

  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-pink-50 to-white p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-pink-100">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Login to Your Account</h2>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4 text-sm">
            Login successful! Redirecting...
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Your email"
                disabled={loading}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Your password"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg font-medium text-white transition-colors ${
                loading 
                  ? 'bg-pink-300 cursor-not-allowed' 
                  : 'bg-pink-500 hover:bg-pink-600 active:bg-pink-700'
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </div>
              ) : (
                'Login'
              )}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>
            Belum punya akun?{' '}
            <Link to="/register" className="text-pink-500 hover:text-pink-700 font-medium transition-colors">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

    
export default Login; 