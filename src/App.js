import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Genres from './components/Genres';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./components/auth/login/index";
import Register from "./components/auth/register/index";
import { AuthProvider, useAuth } from "./contexts/authContext"; // Add useAuth import
import ProtectedRoute from './components/ProtectedRoute';
import GenreSpec from './components/Genrespec';
import { useNavigate } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AdminRoute from './components/AdminRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          {/* Navbar */}
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/home">MovieApp</Link>
            <button 
              className="navbar-toggler" 
              type="button" 
              data-toggle="collapse" 
              data-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary text-white mx-2" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary text-white mx-2" to="/genres">Genres</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary text-white mx-2" to="/about">About Us</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn btn-primary text-white mx-2" to="/contact">Contact Us</Link>
                </li>
              </ul>
              {/* UserStatus component for user info and logout */}
              <UserStatus />
            </div>
          </nav>

          {/* Routes for the application */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
            <Route path="/genres" element={<ProtectedRoute element={<Genres />} />} />
            <Route path="/genre/:genre" element={<ProtectedRoute element={<GenreSpec />} />} />
            <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} /> {/* Admin Dashboard route */}
            {/* Redirect to Home if no route matches */}
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

// UserStatus component to show user info and handle logout
function UserStatus() {
  const { userLoggedIn, username, isAdmin, logout } = useAuth(); // Ensure useAuth is defined here
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <div className="ml-auto">
      {userLoggedIn ? (
        <>
          <span className="navbar-text text-white mx-2">Hello, {username}</span>
          {isAdmin && (
            <Link className="btn btn-outline-light mx-2" to="/admin">Admin Dashboard</Link>
          )}
          <button className="btn btn-outline-light mx-2" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <Link className="btn btn-outline-light mx-2" to="/">Login</Link>
          <Link className="btn btn-outline-light mx-2" to="/register">Register</Link>
        </>
      )}
    </div>
  );
}

export default App;
