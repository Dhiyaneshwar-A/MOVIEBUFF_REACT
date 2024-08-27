import React from 'react';
import { Link } from 'react-router-dom';
import './Genres.css'; // Ensure this CSS file includes the updated styles

const GenreSelection = () => {
  return (
    <div className="genre-selection-container">
      <h2>Select a Genre</h2>
      <div className="button-container">
        <Link to="/genre/action" className="genre-button">Action</Link>
        <Link to="/genre/drama" className="genre-button">Drama</Link>
        <Link to="/genre/comedy" className="genre-button">Comedy</Link>
        <Link to="/genre/comedy" className="genre-button">Romance</Link>
        <Link to="/genre/comedy" className="genre-button">Horror</Link>
        
        {/* Add more genre buttons as needed */}
      </div>
    </div>
  );
};

export default GenreSelection;
