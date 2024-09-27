import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase.js'; // Adjust the path to your firebase.js file
import { useParams } from 'react-router-dom'; // Import useParams
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JS (bundled with Popper)
import './GenreSection.css'; // Custom CSS for additional styling

const GenreSection = ({ defaultGenre, searchQuery }) => {
  const { genre: urlGenre } = useParams(); // Get genre from URL parameters
  const genre = urlGenre || defaultGenre; // Use URL genre or default genre
  const [movies, setMovies] = useState([]);

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

  // Function to get dynamic card class based on genre
  const getCardClass = () => {
    switch (genre) {
      case 'action': return 'action-card';
      case 'drama': return 'drama-card';
      case 'comedy': return 'comedy-card';
      default: return '';
    }
  };

  // Capitalize genre title
  const genreTitle = genre ? genre.charAt(0).toUpperCase() + genre.slice(1) : 'Genre';

  return (
    <div className="genre-section mb-4">
      <div className="title-box mb-4">
        <h2>{genreTitle}</h2>
      </div>

      {filteredMovies.length > 0 ? (
        <div id={`${genre}-carousel`} className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {groupedMovies.map((group, index) => (
              <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                <div className="row">
                  {group.map((movie, idx) => (
                    <div className="col-md-3 mb-4" key={idx}>
                      <div className={`card ${getCardClass()}`}>
                        <img 
                          src={movie.image || 'default-image-url.jpg'} 
                          className="card-img-top" 
                          alt={movie.title || 'Movie'} 
                        />
                        <div className="card-body">
                          <h5 className="card-title">{movie.title || 'Untitled'}</h5>
                          <p className="card-text">{movie.description || 'No description available'}</p>
                          {movie.link && (
                            <a href={movie.link} className="btn btn-primary" target="_blank" rel="noopener noreferrer">More</a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Carousel controls only shown if there are multiple groups */}
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
      ) : (
        // Message for no matches found
        <div className="my-4 text-center ">
          <p className="text-white">No contents to display for this genre. Please try a different search query.</p>
        </div>
      )}
    </div>
  );
};

export default GenreSection;
