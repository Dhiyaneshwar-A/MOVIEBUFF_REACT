import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Genres from './components/Genres';
//import GenreSection from './components/GenreSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { AuthProvider, useAuth } from "./contexts/authContext";
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component
import GenreSpec from './components/Genrespec';

const App = () => {
  const [searchQuery] = useState('');

  return (
      <AuthProvider>
        <Router>
          <div className="container">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
              <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link btn btn-primary text-white mx-2" to="/">Home</Link>
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
                <UserStatus />
              </div>
            </nav>


            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/home" element={<ProtectedRoute element={<Home />} />} />
              <Route path="/genres" element={<ProtectedRoute element={<Genres />} />} />
              <Route path="/genre/:genre" element={<ProtectedRoute element={<GenreSpec searchQuery={searchQuery} />} />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
  );
};

function UserStatus() {
  const { userLoggedIn, username, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      // Handle any post-logout actions here
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

  return (
    <div className="ml-auto">
      {userLoggedIn ? (
        <>
          <span className="navbar-text text-white mx-2">Hello, {username}</span>
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
