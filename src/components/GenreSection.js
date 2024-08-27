import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore instance
import { useParams } from 'react-router-dom'; // Import useParams
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS (bundled with Popper)
import './GenreSection.css';

const GenreSection = ({ defaultGenre }) => {
  const { genre: urlGenre } = useParams(); // Get genre from URL parameters
  const genre = urlGenre || defaultGenre; // Use URL genre or default genre
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (genre) {
          // Fetch movies from Firestore based on the genre
          const querySnapshot = await getDocs(collection(db, genre));
          const moviesData = querySnapshot.docs.map(doc => doc.data());
          setMovies(moviesData);
        }
      } catch (error) {
        console.error("Error fetching movies: ", error);
      }
    };

    fetchMovies();
  }, [genre]);

  // Filter movies based on searchQuery
  const filteredMovies = movies.filter(movie =>
    movie.title && movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Split movies into groups of 4 for each carousel item
  const groupedMovies = [];
  for (let i = 0; i < filteredMovies.length; i += 4) {
    groupedMovies.push(filteredMovies.slice(i, i + 4));
  }

  const getCardClass = () => {
    switch (genre) {
      case 'action': return 'action-card';
      case 'drama': return 'drama-card';
      case 'comedy': return 'comedy-card';
      default: return '';
    }
  };

  // Ensure genre is defined before using it
  const genreTitle = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'Genre';

  return (
    <div className="genre-section mb-4">
      <div className="title-box mb-4">
        <h2>{genreTitle}</h2>
        {/* Add a search input to filter movies */}
        <input
          type="text"
          className="form-control"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div id={`${genre}-carousel`} className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {groupedMovies.map((group, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <div className="row">
                {group.map((movie, idx) => (
                  <div className="col-md-3 mb-4" key={idx}>
                    <div className={`card ${getCardClass()}`}>
                      <img src={movie.image} className="card-img-top" alt={movie.title || 'Movie'} />
                      <div className="card-body">
                        <h5 className="card-title">{movie.title || 'Untitled'}</h5>
                        <p className="card-text">{movie.description || 'No description available'}</p>
                        <a href={movie.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">More</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {groupedMovies.length > 1 && (
          <>
            <a className="carousel-control-prev" href={`#${genre}-carousel`} role="button" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a className="carousel-control-next" href={`#${genre}-carousel`} role="button" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default GenreSection;
