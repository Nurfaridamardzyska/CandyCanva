import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import NewsPage from './pages/Home/NewsPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminAddNews from './pages/Admin/AdminAddNews';
import AdminEditNews from './pages/Admin/AdminEditNews';
import Navbar from './components/Navbar';
import NewsDetail from './components/NewsDetail';
import './App.css';
import './index.css';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  
  if (!isAuthenticated || userRole !== 'admin') {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  const isAuthenticated = localStorage.getItem('token');

  return (
    <Router>
      {isAuthenticated && <Navbar />}
      <div className="container mx-auto px-4 py-8">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard/>} />
          <Route path="/admin/add-news" element={<AdminAddNews />} />

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/add-news" 
            element={
              <AdminRoute>
                <AdminAddNews />
              </AdminRoute>
            } 
          />
          <Route 
            path="/admin/edit-news/:id" 
            element={
              <AdminRoute>
                <AdminEditNews />
              </AdminRoute>
            } 
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
