import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Genres from './components/Genres';
import GenreSection from './components/GenreSection';
import SearchBar from './components/SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from "./components/auth/login";
import Register from "./components/auth/register";

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
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
            </div>
          </nav>

          <div className="search-bar-container my-4">
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genre/:genre" element={<GenreSection searchQuery={searchQuery} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
  );
};

export default App;
