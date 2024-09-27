import React, { useState } from 'react';
import GenreSection from './GenreSection';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchBar from './SearchBar'; // Ensure this is correctly imported

const Home = () => {
  // State to manage a common search query for all genres
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search query change
  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container">
      <h1 className="my-4">MOVIEBUFF</h1>
      {/* Common Search Bar for all genres */}
      <div className="search-bar-container my-4">
        <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      <GenreSection 
        defaultGenre="action" 
        searchQuery={searchQuery} 
      />
      <GenreSection 
        defaultGenre="drama" 
        searchQuery={searchQuery} 
      />
      <GenreSection 
        defaultGenre="comedy" 
        searchQuery={searchQuery} 
      />
      {/* Add more GenreSection components as needed */}
    </div>
  );
};

export default Home;
